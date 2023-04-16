import { Router } from 'express';
import { checkToken } from '../../middleware/token.js'
import {chatController} from "../../controllers/messegesController"

const messagesRoute = Router();

messagesRoute.get('/', checkToken, chatController.getMesseges);
messagesRoute.get('/:email', checkToken, chatController.getMessagesByUser);
messagesRoute.post('/', checkToken, chatController.saveMessages);

module.exports = { messagesRoute }