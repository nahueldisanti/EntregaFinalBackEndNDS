import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { loggerInfo, loggerError} from "./log4js.js"

export default async function sendMail(newOrder){

    const MAIL = process.env.ADMIN_MAIL
    const PASS = process.env.PASS
    const orderProducts = newOrder.products.map(product => {
        return `
        <h3>${product._id}</h3>
        <h3>${product.name}</h3>
        <h3>${product.unitePrice}</h3>`
    })

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
        to: `${newOrder.user.email}`,
        subject: `Orden exitosa`,
        html: `
                <h3>${newOrder.user.username} Su orden ha sido existosa</h3>
                <h3>${orderProducts}</h3>`
    }


    try {
        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (err) {
        loggerError.error (err);
    }
}

