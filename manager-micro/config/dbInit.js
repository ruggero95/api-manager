const db = require('./db.js')

const dbInit  = {
    tables:()=>{      
        db.query(' CREATE TABLE IF NOT EXISTS "plans" ( "id" serial NOT NULL, PRIMARY KEY ("id"),"user_id" text NOT NULL, "name" text NOT NULL,"max_requests" integer NOT NULL, "api_key" text NOT NULL )')
        db.query(' CREATE TABLE IF NOT EXISTS "requests" ( "id" serial NOT NULL, PRIMARY KEY ("id"),"plan_id" integer NOT NULL, "date" timestamp NOT NULL )')
        return
    },
    init:()=>{
        setTimeout(function(){
            try{
                console.log('init database')
                dbInit.tables()
            }catch(e){
                console.log('error init database')
            }
        },3000)
    }
    
}

module.exports = dbInit