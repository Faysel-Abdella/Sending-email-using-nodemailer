const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");
var cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Hello world!");
});

app.post("/send-email", (req, res) => {
  const { name, email, phone, details } = req.body;

  // if (!name || !email || !location) {
  //   return res.status(400).json({ message: "Please provide the all info" });
  // }

  try {
    // Create a transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "fayselcode@gmail.com",
        pass: "oewvpudijwxotwar",
      },
    });

    // Prepare the email options
    const mailOptions = {
      from: email,
      to: "faytonext@gmail.com",
      subject: "New Email From Portfolio",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${details}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent successfully");
        console.log(mailOptions);
        res.send("Email sent");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

app.post("/send-email/worker", upload.single("file"), (req, res) => {
  const { name, email, location, skills } = req.body;
  // const file = req.body.file;

  // if (!file) {
  //   return res.status(400).json({ message: "Please attach a file" });
  // }

  if (!name || !email || !location) {
    return res.status(400).json({ message: "Please provide the all info" });
  }

  try {
    // Create a transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "fayselcode@gmail.com",
        pass: "oewvpudijwxotwar",
      },
    });

    // Prepare the email options
    const mailOptions = {
      from: email,
      to: "jobs@srivango.com",

      // to: "fayselstud@gmail.com",
      subject: "New Email From Worker To Apply for Job",
      text: `Name: ${name}\nEmail: ${email}\nLocation: ${location}\nSkills: ${skills} `,
      // attachments: [
      //   {
      //     filename: file.originalname,
      //     path: file.path,
      //     contentType: "application/pdf",
      //   },
      // ],
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent successfully");
        res.send("Email sent");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
