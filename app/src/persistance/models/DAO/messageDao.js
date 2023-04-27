import { loggerInfo, loggerError, loggerWarn } from '../../../utils/log4js.js'
import messages from "../messagesModel.js"

export default class MessagesDao {

    async getAllMessages() {
        try {
            const allMessages = await messages.find({});
            return allMessages
        } catch(error) {
            loggerError.error(error)
        }
    }

    async getMessagesByUser(username) {
        try {
            const messagesByUser = await messages.find({username: username});
            return messagesByUser
        } catch(error) {
            loggerError.error(error)
        }
    }

    async saveMessage(newMessage) {
        try {
            const savedMessage = await messages(newMessage).save();
            return savedMessage
        } catch(error) {
            loggerError.error(error)
        }
    }
}