import { Server } from 'socket.io'
import httpServer from '../../server.js'

import MessagesServices from '../Services/messageServices.js'
const messagesServices = new MessagesServices()

const io = new Server(httpServer)


io.on('connection', async (socket) => {

    socket.emit('messages', await messagesServices.getAllMessages())
    
    socket.on('newMessage', async data => {
        await messagesServices.saveMessage(data);
        
        io.sockets.emit('messages', await messagesServices.getAllMessages())
    });
})


