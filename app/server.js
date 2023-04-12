import express from "express"
import session from "express-session"
import 'dotenv/config'
import passport from "passport"

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('./public'))

const PORT = process.env.PORT

const server = app.listen(PORT, () =>
logger.info(`Server started on PORT http://localhost:${PORT} --${process.pid} -- at ${new Date().toLocaleString()}`)
);

server.on('error', (err) => {
    logger.info('Error en el servidor:', err)
    })