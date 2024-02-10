import nodemailer from 'nodemailer'
import { emailTemplate } from './emailTemplate.js';

export async function sendEmail(option){
    
const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})

 // send mail with defined transport object
    const info = await transpoter.sendMail({
      from: `"Fred Foo 👻" <${process.env.EMAIL}>`, // sender address
      to: option.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: emailTemplate(option.api),
    });
    console.log("Message sent: %s", info.messageId);
}

