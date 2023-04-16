import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { loggerInfo, loggerError} from "./log4js.js"

export default async function sendMailRegister(newRegister){

    const MAIL = process.env.ADMIN_MAIL
    const PASS = process.env.PASS

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: MAIL,
            pass: PASS
        }
    });

    const mailOptions = {
        from: MAIL,
        to: `${newRegister.email}`,
        subject: `Bienvenido a nuestro Ecommerce ${newRegister.username}`,
        html: `
                <h3>${newRegister.name} ha completado el proceso de registro Existosamente</h3>
                <h3>Ya puedes comprar en nuestra tienda online</h3>`
    }


    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (err) {
        loggerError.error (err);
    }
}

