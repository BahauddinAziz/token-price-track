import * as nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class EmailService {
    transporter: nodemailer.Transporter;

    constructor() {
        const options: SMTPTransport.Options = {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        }
        this.transporter = nodemailer.createTransport(options)
    }

    async sendEMail({ to, subject, body }) {
        await this.transporter.sendMail({
            to,
            subject,
            text: body
        })
    }
}