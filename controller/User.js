const USER = require('../model/user')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

// -------------------------------------------------------------------------------------------------------------

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "rahulmakwana0037@gmail.com",
    pass: "gypc sgba qwth xvff",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"rahulmakwana0037@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Testing E-mail", // Subject line
    // text: "Hello world?", // plain text body
    html: "<h1>Signup Seccess</h1> <h3>Welcome To Puzzle World</h3>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

// -------------------------------------------------------------------------------------------------------------

exports.Signup = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.gender) {
            throw new Error("enter valid fields")
        }
        req.body.password = await bcrypt.hash(req.body.password, 9)

        const data = await USER.create(req.body)

        var token = jwt.sign({ id: data._id }, 'PASS');
        main(req.body.email).catch(console.error);

        res.status(201).json({
            status: "Success",
            message: "Signup Successful",
            data: data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// -------------------------------------------------------------------------------------------------------------

exports.Login = async function (req, res, next) {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("enter valid fields")
        }

        const checkUser = await USER.findOne({ email: req.body.email })
        
        if (!checkUser) {
            throw new Error("enter valid email")
        }

        const checkPass = await bcrypt.compare(req.body.password, checkUser.password);

        if (!checkPass) {
            throw new Error("enter correct Password")
        }

        var token = jwt.sign({ id: checkUser._id }, 'PASS');                                                           

        res.status(201).json({
            status: "Success",
            message: "Login Successful",
            data: checkUser,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
