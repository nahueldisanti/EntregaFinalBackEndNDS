import { Router } from 'express';
import MessagesController from '../../controllers/messegesController.js'
const messagesController = new MessagesController();
const messagesRoute = Router();

messagesRoute.get('/',  messagesController.getAllMessages);
messagesRoute.get('/:email',  messagesController.getMessageByEmail);
messagesRoute.post('/',  messagesController.saveMessage);

export default messagesRoute