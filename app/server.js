import express from "express"
import session from "express-session"
import dotenv from 'dotenv'
dotenv.config();
import passport from "passport"
import routes from './src/routes/routes.js'
//import { strategyLogin, strategySignUp } from "./src/routes/middlewares/passport.js"
import MongoClient from "./src/persistance/db/dbConnection.js"
import { loggerInfo, loggerError, loggerWarn } from './src/utils/log4js.js'
import http from 'http';
import { Server } from 'socket.io'
import MessagesServices from './src/Services/messageServices.js'
import path from 'path'
const messagesServices = new MessagesServices()

import strategyLogin from './src/controllers/loginController.js'
import strategySignUp from './src/controllers/registerController.js'

const app = express();

app.use(session({
    secret: process.env.SECRET,
    // cookie: {
    //     httpOnly: false,
    //     secure: false,
    //     maxAge: Number(process.env.TIEMPO_EXPIRACION)
    // },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

passport.use('login', strategyLogin);
passport.use('register', strategySignUp);

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs');
app.set('views', path.join('./public/views/pages'));

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('/public'))
app.use('/', routes)

const DB = new MongoClient()
DB.connect();

const httpServer = http.createServer(app);

const server = httpServer.listen(process.env.PORT, () =>
    loggerInfo.info(`Servidor escuchando en : http://localhost:${process.env.PORT} at ${new Date().toLocaleString()}`)
);
server.on('error', (err) => {
    loggerInfo.info('Error en el servidor:', err)
});


const io = new Server(httpServer)

io.on('connection', async (socket) => {

    socket.emit('messages', await messagesServices.getAllMessages())
    
    socket.on('newMessage', async data => {
        await messagesServices.saveMessage(data);
        
        io.sockets.emit('messages', await messagesServices.getAllMessages())
    });
})
