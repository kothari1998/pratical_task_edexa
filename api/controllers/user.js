const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

exports.createUser=(req,res,next)=>{
  console.log(req.body);
  bcrypt.hash(req.body.password,10)
.then(hash=>{
  const user=new User({
  name: req.body.name,
  email: req.body.email,
  profile_picture: req.body.profile_picture,
  password:hash
});
    user.save()
    .then(result=>{
     res.status(201).json({
     message:"Account created successfully",
     result:result
     
  });

 
  // initialize nodemailer
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rajankothari98@gmail.com',
    pass: 'Rajan@8280'
  }
});


// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


var mailOptions = {
    from: 'rajankothari98@gmail.com', // sender address
    to: result.email, // list of receivers
    subject: 'Welcome!',
    template: 'email', // the name of the template file i.e email.handlebars
    context:{
        name: result.name, // replace {{name}} with Adebola
        company: 'My Company' // replace {{company}} with My Company
    }
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
       error:{
        message:"Invalid details"
      }
      // err
      });
    });
     });
};

//user login
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id, name: fetchedUser.name}, "secret_this_should_be_longer",
        { expiresIn: "1h" } 
      );
      res.status(200).json({
         name: fetchedUser.name,
         token: token,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    });
};
