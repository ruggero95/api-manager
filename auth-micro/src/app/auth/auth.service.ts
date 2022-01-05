import { logger } from './../../core/logger'
import { IUser, User } from './../user/user.model'
import { Token } from "./token.model"
import jwt from "jsonwebtoken"
import { AuthFailureError } from './../../core/errorResponse'

export class AuthService {
    public async login(username: string, password: string) {
        let user:IUser = await User.findOne({ username: username })
        if (!user) {
            //create userif not exist
            logger.info('creo utente')
            user = await this.createUser(username, password)
        }else{
            const result =  await user.comparePassword(password)
            if(!result){
                throw(new AuthFailureError('Wrong password'))
            }
        }
        const token = user.genereteAccessToken()
        const tokenModel = await new Token({token: token, userId: user._id})
        await tokenModel.save()
        return token
    }

    public async createUser(username: string, password: string): Promise<IUser> {
        const user = new User({ username: username, password: password,tokens:[] })
        await user.save()
        return user
    }

    public async checkUser(tokenString: string):Promise<any> {
        //check user con il token
        try{
            const payload:any = await jwt.verify(tokenString, process.env.ACCESS_TOKEN)
            const token = await Token.findOne({token:tokenString, userId:payload.id ? payload.id : ''})
            if(!token || (Array.isArray(token) && token.length==0)){
                throw(new AuthFailureError('Token not registered'))
            }            
            return payload
        }catch(e){
            throw(new AuthFailureError('Token not valid'))
        }
      

    }

    public async logout(tokenString:string): Promise<boolean>{
        const token = await Token.deleteMany({token:tokenString})
        return true
    }
}