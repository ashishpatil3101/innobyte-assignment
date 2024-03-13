import nodemailer from 'nodemailer'; 
import jwt from 'jsonwebtoken'; 
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const sendEmail = (to)=>{
    const transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.EMAIL_PASSWORD
        } 
    }); 
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    }; 
    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))
    const token = jwt.sign({ 
            email: to 
        }, process.env.SECRET_KEY, { expiresIn: 86400 }   
    );     
    const confirmationLink=process.env.EMAIL_CONFIRMATION_LINK+token;
    const mailConfigurations = { 
        from: '"abc company 👻" <s@gamail.email>', 
        to: to, 
        template: "email", // the name of the template file, i.e., email.handlebars
        subject: 'Email Confirmation', 
        context: {
            confirmationLink: confirmationLink
          },         
    };    
    transporter.sendMail(mailConfigurations, function(error, info){ 
        console.log("error", error)
        if (error) throw Error(error); 
        console.log('Email Sent Successfully'); 
    }); 
}

export default sendEmail;
