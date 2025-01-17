// filepath: /home/db-l-154/Desktop/js/personal_projects/server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { firstName, lastName, email, message, contactNumber, consultancy } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mgopinath413@gmail.com',
            pass: ''
        }
    });

    const mailOptions = {
        from: email,
        to: 'mgopinath413@gmail.com',
        subject: `Consultancy Request from ${firstName} ${lastName}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nContact Number: ${contactNumber}\nConsultancy: ${consultancy}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});