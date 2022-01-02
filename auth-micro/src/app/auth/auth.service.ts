import { logger } from 'core/logger'
import { User } from './../user/user.model'
import { Token } from "./token.model"
export class AuthService {
    public async login(username: string, password: string) {
        let user = await User.findOne({ username: username })
        const result = user ?  await user.comparePassword(password) : false
        if (!result) {
            //create userif not exist
            logger.info('creo utente')
            user = await this.createUser(username, password)
        }

        const token = user.genereteAccessToken()
        console.log(token)
        const tokenModel = await new Token({token: token, userId: user.id})
        await tokenModel.save()
        return token
    }

    public async createUser(username: string, password: string) {
        const user = new User({ username: username, password: password,tokens:[] })
        console.log(user)
        await user.save().catch((err)=>{console.log('errore'); console.log(err)})
        console.log('saved')
        return user
    }

    public async checkUser(token: string) {
        //check user con il token
    }
}