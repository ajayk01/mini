
var nodemailer = require('nodemailer');
var send=function(msg,e)
{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajaykathir1101@gmail.com',
    pass: 'Ajay@2001'
  }
});

var mailOptions = {
  from: 'ajaykathir1101@gmail.com',
  to: e,
  subject: 'Order Placed Conformation - Email',
  text: msg
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    return info.response;
  }
});
}

exports.send = send;