import { logger } from "./core/logger";
import {app} from "./app"

const PORT = process.env.PORT || 4003

app.listen(PORT,()=>{
    logger.info(`Running on port ${PORT}`)
})
