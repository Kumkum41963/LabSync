import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

console.log({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: process.env.MAILTRAP_SMTP_PORT,
});

export const sendMail = async (to, subject, text) => {
    try {
        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            secure: false, // true for 465, false for other ports [remove in prod.]
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASS,
            },
        });


        const info = await transporter.sendMail({
            from: '"Inngest TMS',
            // will be same as we get from created method
            to,
            subject,
            text, // plain‑text body
            // html: "<b>Hello world?</b>", // HTML body
        });

        console.log("Message sent:", info.messageId);

    } catch (error) {
        console.log('Mailer err',error)
        throw error
    }
}
