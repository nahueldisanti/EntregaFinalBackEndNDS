import express from "express"
import session from "express-session"
import 'dotenv/config'
import passport from "passport"
import routes from './src/routes/routes.js'
import { strategyLogin, strategySignUp } from "./src/routes/middlewares/passport.js"
import { MongoClient } from "./src/persistance/db/dbConnection.js"
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'
import {createServer} from 'http';
import { Server } from 'socket.io'
import MessagesServices from '../Services/messageServices.js'
const messagesServices = new MessagesServices()

const app = express();

//passport.use('login', strategyLogin);
//passport.use('signup', strategySignUp);

//app.use(passport.initialize())
//app.use(passport.session())

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('./public'))
app.use('/', routes)

app.use(session({
    secret: process.env.SECRET,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

const DB = new MongoClient()
DB.connect();

const PORT = process.env.PORT


const httpServer = createServer(app);

const server = httpServer.listen(PORT, () =>
    loggerError.info(`Server started on PORT http://localhost:${PORT} --${process.pid} -- at ${new Date().toLocaleString()}`)
);

server.on('error', (err) => {
    loggerError.info('Error en el servidor:', err)
});

const io = new Server(httpServer)

io.on('connection', async (socket) => {

    socket.emit('messages', await messagesServices.getAllMessages())
    
    socket.on('newMessage', async data => {
        await messagesServices.saveMessage(data);
        
        io.sockets.emit('messages', await messagesServices.getAllMessages())
    });
})
