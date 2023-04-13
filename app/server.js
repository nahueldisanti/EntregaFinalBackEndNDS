import express from "express"
import session from "express-session"
import 'dotenv/config'
import passport from "passport"
import routes from './src/routes/routes.js'
import { strategyLogin, strategySignUp } from "./src/routes/middlewares/passport.js"
import { MongoClient } from "./src/persistance/db/dbConnection.js"

const app = express();

passport.use('login', strategyLogin);
passport.use('signup', strategySignUp);

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('./public'))

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

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

MongoClient.connect();

const PORT = process.env.PORT

const server = app.listen(PORT, () =>
logger.info(`Server started on PORT http://localhost:${PORT} --${process.pid} -- at ${new Date().toLocaleString()}`)
);

server.on('error', (err) => {
    logger.info('Error en el servidor:', err)
});