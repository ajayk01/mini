const express = require('express');
const app = express();
const userRoute = express.Router();
const AWS = require('aws-sdk');
var url;
const ID = 'ASIAR6VRTUKZQW6YXXPY';
const SECRET = 'IWC26w173VowDeIi0zVJLljTgYAMDd/DhP/vrSY6';
const token='IQoJb3JpZ2luX2VjEO///////////wEaCXVzLXdlc3QtMiJHMEUCIQDf1azLgHL9XMzkrYxfpYG5tWFtd2NvqJ/qxgRiJ1jPHAIgX24rIJjO2bGCG8wLfvOdxednuAd5zBjJhow5ysOpP4gqrQIIeBAAGgwxMzQ1OTAyMTA3MzkiDBAS+ktTUJ4JAjGogyqKAtb8pV/eBtRtwAZxDD86/GdEvM8VQdxyY0O11eaFqiHt7gzkTgYkrHVb+T7YoWtWHqtnOym+/wzwF3f25ZDx2L3CKTLaPzvPXjjlSKDLCnTk40o2Ppx3hzx3G0smSXmYw6QJ5Tol+byJwLmxkuflYj0WD3IhOKqeQgLOMEHcDAiAvR6WVJOUDyCdzGkVUoWtMg8fSAkMi8ouVZOeOh4bTwtAHkA0dRYrS0PC9/IRigM47NUgb+/YtO8cSmfZ7YXX/9XO/GXf5zuMsvrmBMdS3iWBllqTc+hzJ/0oJ6KPyUWJIfbNSkkPdjrItZox2N4eC+WFFlPlscfngc15PMczHyu9t4CqRW7pQmHOMObg34QGOp0BO0g5Z49jHNgBhzL9Eet23Z5qrH65ubZ0Ruy/MwGq5KyJGM4zMp7A/pZuD79kTUPQA+aTrY8Eof6DMgw+OQEuEO1cH/P/V6bNTC7V+KZpei/bFQII5zSdv6O0iOnBo1DRh4/nBgqaB4jBEBIJTjfCJZCpLn5zLqTQs1pDSkunqqf3GuabnnlCY5DwmCGaGaeRnYLyuRoDG0sz4Qm6uQ==';
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

var uploadFile = async function(fileName,key,req,res){
  console.log("Inside aws");
  const params = {
      Bucket: 'sample-0111',
      Key: key, 
      Body: fileName
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      url =  data.Location;
      console.log(`url uploaded successfully. ${data.Location}`);
      Product.create({material:req.body.material,id:req.body.id,stock:req.body.stock,cost:req.body.cost,pic_url:url},(error, data) => {
        if (error) {
          return next(error)
        } else {
    
    res.json(data)
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
  // console.log("add product");
  // uploadFile(req.body.imgSrc,req.body.material+req.body.id+".png",req,res).then(alert)
  // console.log(alert)
 Product.create({material:req.body.material,id:req.body.id,stock:req.body.stock,cost:req.body.cost,pic_url:req.body.imgSrc},(error, data) => {
    if (error) {
      return next(error)
    } else {
          res.json(data)
    }
  })
})

userRoute.route('/placeorder').post((req, res, next) => {
  var j="Address :"+req.body.address;
  j = j+" Phone Number : "+req.body.phone_number;
  j = j+" Total Cost : "+req.body.cost;
  j = j+" Name : "+req.body.user_name;
  email.send(j,req.body.user_email);
  Order.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).send(data)
      // res.json(data)
    }
  })
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