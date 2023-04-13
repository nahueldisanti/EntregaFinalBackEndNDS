import { Router } from 'express';
import { isAuth } from '../controller/isAuth.js';
import {chatController} from "../../controllers/messegesController"

const messagesRoute = Router();

messagesRoute.get('/', isAuth, chatController.getMesseges);
messagesRoute.get('/:email', isAuth, chatController.getMessagesByUser);
messagesRoute.post('/', isAuth, chatController.saveMessages);

export default messagesRoute