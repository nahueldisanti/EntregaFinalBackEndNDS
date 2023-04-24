import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
import MessagesServices from '../Services/messageServices.js'
const messagesServices = new MessagesServices();

export default class MessagesController {

    async getAllMessages(req, res) {
        try{
            const allMessages = await messagesServices.getAllMessages();
            res.json(allMessages);
            return res.render('chats.ejs', {allMesseges})

        }catch(error){
            loggerError.error(error)
        }
    }

    async getMessageByEmail(req, res) {
        try {
            const messageByEmail = await messagesServices.getMessagesByUser(req.params.email)
            res.json(messageByEmail)
        }catch(error){
            loggerError.error(error)
        }
    }

    async saveMessage(req, res) {
        try {
            const email = req.email
            const savedMessage = await messagesServices.saveMessage(req.body, email);
            res.json(savedMessage)
        }catch(error){
            loggerError.error(error)
        }
    }
}