const express = require('express');
const app = express();
const userRoute = express.Router();
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
var url;
const ID = 'ASIAR6VRTUKZU74V7ULY';
const SECRET = 'QtUdSo4HS5A9HJ/X8M+81sw27fZVOAJSIvQMAp5J';
const token='IQoJb3JpZ2luX2VjEP7//////////wEaCXVzLXdlc3QtMiJHMEUCIQCz/vB3uaC3ngJ9aOGXwqe+OYtjJa+91cAzWQ8GD+oy3AIgC2+l0QgxXwX9G7h8uHG51fz68etrgU0Gb76O76qxc2oqtgIIh///////////ARAAGgwxMzQ1OTAyMTA3MzkiDPV2i1v5csDk7us7piqKAk3Datx4heG0OznkppbQUmj+/kKwW8+1kHjfS7ATHYcGnpA++3NKNwhT1Wq852Cl0lhS2dZRR19Vv8/N0puuxZ58KVEz6vr0Bb9q8XkHs5yGYmLsfH3zJN+G2bPPKnwjNyP3yDko/5Y1nLuKsEvVNkNOwVgyzt/iU9/PR9bioUUBcGeGKLzM2Zkkklb5O07+3uiCYI2qbP71ynkeiLN0DqtveDFF3eISg5ajgyqUcDCP3rp4rtQEXzF230Zn4rpqnp3q3K2/vh1uXT9wEI1gZ9rp6jkyFlTpJcPz9sNhnxsGXPvCYfr864ElZrd3HuQb0hy/kTjJ77Y0iZg0XlMZ3OyNZ984eDhwhx+5MJmM44QGOp0BERWzN3ZumuDgABUPqRpVv66BA0sA8h4FZyDTeZpcQs2NCdKIpCeeKqNHiMXHSUtlQvoH1iowa3jYsyZ5UvnlgX80Qz0CnYWKihf1JG5ymsaSZMYZ2KTrRAvkw5cu0SqJPIi39H2c90Fr1jOmeTW3yNarT4ioyfLPiH2SH4FJBSK+9Wy3G+rHNfdoMC54ZohXgSgoJJfHymfwgVLgUA==';
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