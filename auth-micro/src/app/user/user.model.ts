import mongoose, { Types } from "mongoose";
import jwt from "jsonwebtoken"
import { CostantEnum } from "./../../config/constants";
import sha256 from "crypto-js/sha256";
export interface IUser{
    username:string;
    password:string;
    tokens:Types.ObjectId;
    genereteAccessToken: ()=>string;
    verifyAccessToken:(accessToken:string)=>Promise<null | object>;
    comparePassword:(candidatePassword:string)=>Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        username: String,
        password: String,
        tokens: [
            {
                type: [mongoose.Schema.Types.ObjectId],
                ref:"Token"
            }
        ]

    }
)



UserSchema.methods.genereteAccessToken = function () {
    let payload = {
        id: this._id,
        username:this.username
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: CostantEnum.TOKEN_EXPIRY
    })
}

UserSchema.methods.verifyAccessToken = function (accessToken) {
    let user = this
    return new Promise((resolve, reject)=>{
        jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, payload)=> {
            if(err){
                resolve({
                    payload:null
                })
            }
            let new_payload = {...payload}
            resolve({
                payload:new_payload
            })
        })
    }) 
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    if(sha256(candidatePassword)===this.password){
        return true
    }
   
    return false
};

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = sha256(this.password) 
    next()  
})

export const User = mongoose.model<IUser>('Users',UserSchema,'Users')