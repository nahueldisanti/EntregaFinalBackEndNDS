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

    async getMessagesByUser(user) {
        try {
            const messagesByUser = await messages.find({user: user});
            return messages
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