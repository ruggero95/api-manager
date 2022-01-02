import { CostantEnum } from "./../../config/constants";
import mongoose, { Types } from "mongoose"

interface IToken{
    _id:Types.ObjectId;
    token:string;
    userId:Types.ObjectId;
    createdAt: any,
}
const tokenSchema = new mongoose.Schema<IToken>({
    token:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: CostantEnum.TOKEN_EXPIRY
    }
}, {timestamps: true});


export const Token = mongoose.model<IToken>('Tokens',tokenSchema,'Tokens')
