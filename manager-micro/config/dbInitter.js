const knex = require('./db')

const initter = {
    checkConnection: async () => {
        try {
            await initter.tables()
            console.log('controllo se esiste tabella')
            const res = await knex.raw('SELECT * FROM plans where user_id=?',[1]).catch(err => {
                console.log('inside catch')   
                initter.rescheduleCheck()                
            });
            console.log('tabelle inizializzate')
        } catch (e) {            
            initter.rescheduleCheck()
        }
    },
    rescheduleCheck:()=>{
        console.log('rischedulo controllo')
        setTimeout(function () {
            initter.checkConnection()
        }, 3000)
    },
    tables: async () => {
        console.log('eseguo tables')
        await knex.raw('CREATE TABLE IF NOT EXISTS "plans" ( "id" serial NOT NULL, PRIMARY KEY ("id"),"user_id" text NOT NULL, "name" text NOT NULL,"max_requests" integer NOT NULL, "api_key" text NOT NULL )')
        await knex.raw('CREATE TABLE IF NOT EXISTS "requests" ( "id" serial NOT NULL, PRIMARY KEY ("id"),"plan_id" integer NOT NULL, "date" timestamp NOT NULL )')
    }
}

module.exports = initter