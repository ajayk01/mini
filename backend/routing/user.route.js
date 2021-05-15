const express = require('express');
const app = express();
const userRoute = express.Router();
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
var url;
const ID = 'ASIAR6VRTUKZ2WLTXQU6';
const SECRET = 'an5e0sh8bKjVO6HDh+6Oaa1NFmonfrN6EW4Vlwxr';
const token='IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIGJvxhtKGQM3v5ycWtdUubGOlLIb5D9hGPjUmJ9kW8eJAiBxJH/8OnfC/AVRbtqztBYo9VEtugI82CtfNg2EP3dnyyq2Agju//////////8BEAAaDDEzNDU5MDIxMDczOSIMaAlOlWWhq0q0hB9hKooCnsPddSk7xDldd7kfgeyOm7u5/26h5AJ+90Vdcu+7n5sminSmPK2oLdrZv5O1TfjDX2SApuUNK31XxR9TP9m0OeWSS8ntKQ5GNIa0JH6w+df2eXuI58AddBTmAyvJ7lRXB2MCIffF3qxc/QWFAB45beswRH+xxrFohT+d1WiQY+W0ptjqs35i3fQm6pXRhpiC1PeVOr74bV5+DNjGEf5CJ+Oe8rmAvnzwlFv6jE1e9bJaR1L+veRQF+n26Pkvo/oRx/IvElv7wgVCpJwojHqr9wf+WZNwizu+ZrLQ0vLMVOfATdVGsJhr+sPUfCe7IoMotKMY47CvFUuZg8Yjg/q1DsaTvdrFOFj6FtgwvNz5hAY6ngHxdKBYw9ihoyJ5uCWGUJr+fcKi/vxELhbrTSfFqv9YYYwmUbuQOrZHleM0MhvW4EacX6N3bdh8E4tyL9gD67i84JRsLI4ce+rbzoYKxDvQEaLwGMRRZvup0XbfnPoGBv6N2gXdq0o/JH1IleO6sUD0MNCm5R+cQ24gtRsq+6qxcT9lxUCMB4lLo3rE6OqBCYDzM5LKGUErPNhiHtuP9g==';
const BUCKET_NAME = 'ajay-0111';
let User = require('../models/User');
let Product = require('../models/Product');
let Cart = require('../models/Cart')
let aws = require('../file_upload_aws')
let Order = require('../models/Order');
let email = require('../email-sender');

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  sessionToken:token

});

var uploadFile = async function(image,key,req,res){
  buf = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""),'base64');
  const params = {
      Bucket: 'sample-0111',
      Key: key, 
      Body: buf,
      ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
  };

  // // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      // console.log(`File uploaded successfully. ${data.Location}`);
      url =  data.Location;
       console.log(`url uploaded successfully. ${data.Location}`);
      Product.create({material:req.body.material,id:req.body.id,stock:req.body.stock,cost:req.body.cost,pic_url:url},(error, data) => {
        if (error) {
          return next(error)
        } else {
          res.status(200);
          res.json({code:1});
        }
      })
  });
};

// Employee model


// Add Employee
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).send(data)
      // res.json(data)
    }
  })
});

// // Get All Employees
userRoute.route('/').get((req, res, next) => {
  
  User.find({},(error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data);
     return res.json(data)
    }
  })
})

// Get single employee
userRoute.route('/read').post((req, res,next) => {
  
  User.findOne({email:req.body.email},(error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log("data");
      // console.log(data);
      res.json(data)
    }
  })
})


// Update employee
userRoute.route('/update').post((req, res,next) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.body.id,{'email':req.body.email,'firstname':req.body.firstname,'lastname':req.body.lastname},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Delete employee
userRoute.route('/delete').post((req, res,next) => {
  console.log("delete : "+req.body);
  User.findOneAndRemove({'name':req.body.dname},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

userRoute.route('/readproduct').post((req, res,next) => {
  console.log(req.body);
  Product.find({},(error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("data");
      console.log(data);
      res.json(data)
    }
  })
})


userRoute.route('/postcart').post((req, res, next) => {
  console.log(req.body);
  
  Cart.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).send(data)
      // res.json(data)
    }
  })
});

userRoute.route('/getcart').post((req, res,next) => {
  // console.log(req.body);
  Cart.find({user_id:req.body.user_id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

userRoute.route('/removecart').post((req, res,next) => {
  console.log("delete");
  console.log(req.body.product_id);
  Cart.findOneAndDelete({'product_id':req.body.product_id},(error, data) => {
    if (error) {
      return next(error)
    } else {

      res.json(data)
    }
  })
})
var alert;
userRoute.route('/addproduct').post((req, res,next) => {
  //  console.log(req.body);
  console.log("add product");
  uploadFile(req.body.imgSrc,req.body.material+req.body.id+".png",req,res).then(alert)
 
})
function remove(req)
{
  console.log("Inside");
  console.log(req.body);
  var s = (req.body.product_id.split(','));
   var ss = (req.body.stock.split(','));
   console.log(s.length);
   for(var i=1;i<s.length;i++)
   {
    Cart.findOneAndUpdate({'product_id':s[i]},{'stock':parseInt(ss[i])-1},(error, data) => {
      if (error) {
        return next(error)
      } else {
        // res.json({n:1})
        console.log("no error");
      }
    })  
  Cart.findOneAndDelete({'user_id':req.body.user_id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      //  res.json({n:1})
      console.log("no error");
    }
  })
}
}
userRoute.route('/placeorder').post((req, res, next) => {

  
   var s = (req.body.product_id.split(','));
   var ss = (req.body.stock.split(','));
   console.log(s.length);
   console.log()
    for(var i=1;i<s.length;i++)
   {

   Product.findByIdAndUpdate(s[i],{'stock':parseInt(ss[i])-1},(error, data) => {
    if (error) {
      return next(error)
    } else {
      // res.json({n:1})
      console.log("no error");
    }
  })
     
}

  Order.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      var j="Address :"+req.body.address;
      j = j+" Phone Number : "+req.body.phone_number;
      j = j+" Total Cost : "+req.body.cost;
      j = j+" Name : "+req.body.user_name;
      j = j+" Order id :"+data._id;
      email.send(j,req.body.user_email);
      res.json(data)
    }
  })
  remove(req);
});


userRoute.route('/forgot').post((req, res, next) => {
  console.log(req.body);
  var j="Your Password is "+req.body.password;
   email.send(j,req.body.email,(error) =>
   {
     if(error)
      {
         res.statusCode(200);
      }
   });
 
});



module.exports = userRoute;