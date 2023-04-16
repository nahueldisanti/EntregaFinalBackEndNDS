import mongoose from "mongoose"
import { loggerError, loggerInfo } from "../../utils/log4js.js";
import 'dotenv/config'


const connectionStringUrl = process.env.MONGODB;

class MongoClient {
    constructor() {
        this.connected = false
        this.client = mongoose
    }

    async connect() {
        try {
            await this.client.connect(connectionStringUrl,
                { useNewUrlParser: true, 
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 100000
            })
            .then(() => loggerInfo.info('Conectado a Mongo'));
            this.connected = true
        } catch (error) {
            loggerError.error(error);
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            .then(() => loggerInfo.info('Desconectado de Mongo'));
            this.connected = false;
        } catch(error) {
            loggerError.error(error)
        }
    }
}

export default MongoClient