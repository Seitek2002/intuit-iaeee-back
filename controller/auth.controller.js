require("dotenv").config();
const nodemailer = require("nodemailer");

const registration_post = async (req, res) => {
  try {
    let { name, phone, email, product, description } = req.body;

    console.log(name, phone, email, product, description);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "seitekbegaliev@gmail.com",
        pass: "s14s02s2002s",
      },
    });

    transporter.sendMail(
      {
        from: "seitekbegaliev@gmail.com",
        to: email,
        subject: "Форма регистрации заполнена",
        text: `${name, phone, email, product, description}`,
      },
      (e) => {
        console.log(e);
      }
    );

    return res.json({ message: "User was created" });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server Error", e });
  }
};

module.exports = { registration_post };
