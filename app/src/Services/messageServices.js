import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
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

    async getMessageByEmail(username) {
        try {
            const messageByEmail = await messageDao.getMessagesByUser(username)
            if(messageByEmail.length() > 0) {
                return messageByEmail
            } else {
                loggerError.error(`No hay mensajes de este email`)
            }
        }catch(error){
            loggerError.error(error)
        }
    }

    async saveMessage(textMessage, username) {
        try {
            const newMessage = {
                timestamp: moment().format('L LTS'),
                text:textMessage, 
                username: username
            }
            const saveMessage = await messageDao.saveMessage(newMessage)
            return saveMessage
        }catch(error){
            loggerError.error(error)
        }
    }

}

