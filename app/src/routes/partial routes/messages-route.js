import { Router } from 'express';
import checkToken from '../../middleware/token.js'
import MessagesController from '../../controllers/messegesController.js'
const messagesController = new MessagesController();
const messagesRoute = Router();

messagesRoute.get('/', checkToken, messagesController.getAllMessages);
messagesRoute.get('/:email', checkToken, messagesController.getMessageByEmail);
messagesRoute.post('/', checkToken, messagesController.saveMessage);

export default messagesRoute