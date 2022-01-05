const { Client } = require('pg');

const connection = {
    client:null,
    tables:()=>{  
        if(connection.client==null){
            return connection.rescheduleTablesInit()
        }
        console.log('inj tables') 
        connection.client.query(' CREATE TABLE IF NOT EXISTS "plans" ( "id" serial NOT NULL, PRIMARY KEY ("id"),"user_id" text NOT NULL, "name" text NOT NULL,"max_requests" integer NOT NULL, "api_key" text NOT NULL )')
        connection.client.query(' CREATE TABLE IF NOT EXISTS "requests" ( "id" serial NOT NULL, PRIMARY KEY ("id"),"plan_id" integer NOT NULL, "date" timestamp NOT NULL )')
        return
    },
    rescheduleTablesInit:()=>{
        setTimeout(function(){
            connection.tables()
        },2000)
    },
    connection:()=>{
        try{
            if(connection.client){

                connection.client.end().catch((e)=>{})
            }
            connection.client = new Client();
            connection.client.connect().catch((e)=>{
                console.log('error connection db catch')
                console.log(e)
                connection.rescheduleConnection()
                connection.rescheduleTablesInit()
            });
            console.log('connected properly')
            return connection.client
        }catch(e){
            console.log('error connection db')
            console.log(e)
            connection.rescheduleConnection()
            connection.rescheduleTablesInit()
        }
    },
    rescheduleConnection:()=>{
        console.log('rescheduling connection')
        setTimeout(function(){
            connection.connection()
        },1000)
    }
}

module.exports = connection;
