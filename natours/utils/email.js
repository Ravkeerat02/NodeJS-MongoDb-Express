const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    // create transporter - SERVICE THAT SENDS THE EMAIL
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // authentication process
        auth : {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
        // Activating in gmail "less secure app" option
    });

    // define email options
    const mailOptions = {
        from : 'Admin <ud2@gmail.com>',
        to : options.email,
        subject : options.subject,
        text : options.message,
        // html : options.html
    }
    // actually send the email with nodemailer
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;