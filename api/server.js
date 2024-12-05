const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const allowedOrigins = ['https://sabdaliterasi.xyz'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Akses tidak diizinkan oleh CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));

// Simulasikan database email
const database = [
  {
    email: "fadhel13fikri@gmail.com",
    server: "gmail",
    password: "nprqryudgsrhwlzo"
  },
  {
    email: "fadhelfikri@yahoo.com",
    server: "yahoo",
    password: "qfaeokubzwsnadkc"
  },
  {
    email: "fadhelfikri98@gmail.com",
    server: "gmail",
    password: "xbfrrxverwltrdfw"
  },
{
    email: "martinamulia04@gmail.com",
    server: "gmail",
    password: "jtadcnyosmtjnwrq"
  },
  {
    email: "fadhelfikri93@gmail.com",
    server: "gmail",
    password: "zfktmdnaxmadzhub"
  },
  {
    email:"viperkansaz@gmail.com", 
    server: "gmail",
    password: "bkpddmuhzmrduojo"
  }
  
];
app.post('/send-email', async (req, res) => {
  try {    
    const { mail, nama, recipientEmail, subject, message, attachment1, attachment2, Nameattachment1, Nameattachment2 } = req.body;
    
    // Cari informasi email dari database
    const emailData = database.find(entry => entry.email === mail);
    if (!emailData) {
      throw new Error('Informasi email tidak ditemukan dalam database.');
    }

    const transporter = nodemailer.createTransport({
      service: emailData.server,
      auth: {
        user: mail,
        pass: emailData.password
      }
    });

    const mailOptions = {
      from: mail,
      to: recipientEmail,
      subject: subject.replace("Kirim Artikel_","Kirim Tulisan-"),
      html: message,
      attachments: [
        {
          filename: Nameattachment1,
          content: attachment1,
          encoding: 'base64'
        },
        {
          filename: Nameattachment2,
          content: attachment2,
          encoding: 'base64'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log('Email berhasil dikirim');
    res.status(200).send("Email berhasil dikirim dengan lampiran from: " +
          mail +
          " to:" +
          recipientEmail);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Gagal mengirim email: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/send-email`);
});
