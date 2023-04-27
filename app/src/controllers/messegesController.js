import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
import MessagesServices from '../Services/messageServices.js'
const messagesServices = new MessagesServices();

export default class MessagesController {

    async getAllMessages(req, res) {
        try{
            const currentSession = req.session.passport.user
            const allMessages = await messagesServices.getAllMessages();
            
            return res.render('chats.ejs', {
                allMessages,
                currentSession})

        }catch(error){
            loggerError.error(error)
        }
    }

    async getMessageByEmail(req, res) {
        try {
            const currentSession = req.session.passport.user
            const messageByEmail = await messagesServices.getMessagesByUser(currentSession)
            res.json(messageByEmail)
        }catch(error){
            loggerError.error(error)
        }
    }}
