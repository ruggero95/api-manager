import { logger } from "./../core/logger";
import mongoose from "mongoose"

export class DB {
    private  mongoUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.ME_CONFIG_MONGODB_SERVER}:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`
    private retry = 0

    public init() {
        mongoose.Promise = global.Promise;
        mongoose.set('bufferCommands', false);
        let retry = 0
        mongoose.connect(this.mongoUrl, (err) => { 
            if(err){
                logger.error('Error connecting mongo db')
                logger.error(err) 
                const message = err && err.stack ? err.stack : (err && err.message ? err : 'Error')
                logger.error(message)
                if(this.retry < 8){
                    setTimeout(()=>{
                        logger.info('retrying mongo connection n '+this.retry)
                        this.retry +=1                
                        this.init()
                    },3000)
                }
            }else{
                logger.info('connection to mongo correclty')
            }

        });
        const connection = mongoose.connection;
        connection.once('open', () => logger.info('connection established correctly'));
        connection.on('error', (err) => {
            logger.error('Mongo db conneciton error')
            logger.error(err.message ? err.message : err)
        });
        return mongoose

    }
}