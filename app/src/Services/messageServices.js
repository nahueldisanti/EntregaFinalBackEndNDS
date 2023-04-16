import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'
import MessagesDao from '../persistance/models/DAO/messageDao.js'
import moment from 'moment'

const messageDao = new MessagesDao();

export default class MessagesServices {
    
    async getAllMessages() {
        try {
            const allMessages = await messageDao.getAllMessages();
            if (allMessages.length > 0) {
                return allMessages
            } else {
                loggerError.error(`No existen mensajes`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }

    async getMessageByEmail(email) {
        try {
            const messageByEmail = await messageDao.getMessagesByUser(email)
            if(messageByEmail.length() > 0) {
                return messageByEmail
            } else {
                loggerError.error(`No hay mensajes de este email`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }

    async saveMessage(message, email) {
        try {
            message.timestamp = moment().format('L LTS')
            message.email = email
            const newMessage = await messageDao.saveMessage(message)
            return newMessage
        }catch(error){
            loggerError.error(error)
        }
    }

}

