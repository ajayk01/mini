const express = require('express');
const app = express();
const userRoute = express.Router();
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
var url;
const ID = 'ASIAR6VRTUKZ44QXACMY';
const SECRET = 'kejuL7a4keukJ4/Bg8ZbDX0VRIJzaU/VnOGeGPOs';
const token='IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCICk737T1TNFMF8fhVufj/eL1drtxHs2T+w6FfxjcIimyAiEAym17bGKeO9u3JMjmxIwwpcculKt5jj7sIeZhJL/rx5oqrQIIERAAGgwxMzQ1OTAyMTA3MzkiDJgeN3p9j306xpMGgCqKAiLeB/dqUa81Ua/Q2ghEn3GiE1kTldFggO/OfGrwit0L7yQEcpod4DVVGfMSWON4NHAKdbV379MAWmUD1t5mtbBoxoJl/1QAkl+TdSUrp8BjlrSXID5NHqr84Lr9iP4vhEJazX03hSiBnHGTXLjEHYbDkDpMWhZbxidl1X1Hf4NrY9z+hFo+xtMx5RoDPzIIATRiQhykVIGddOd33MuL4b45KzzRF9bRadHaJH8uxb7aCfi4BuD7qxD+geogzgy8fIPUxvt/MOOzJWpG6WvOD1iRjehE9WlAw/8Qvagisxc4jFg0sc1X3uXjV1WK4f2ITp2sL/9nfQDTf35j40ABL0t6ej1ctIJ6JKsOMOSB/oQGOp0BS5XNt1lskuvgyhhh6qgZ85hJtBi0FmQNAunEMb6FNAYWdyq21+Dhw1xYUhA7SzsWLhxxpxndWOohizf42++OwYMFkDAMSdy5vx65pS7ZlsVARm3QuvQJE8SYpvPdUZHFCYiIambkNGE9hCHvB1WlMsMe/SGypDtH2S4Lf8JDmoQmdDDxtBzbTrRXRfZesY0C9/QFonTQ5JXgNWkS4A==';
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
       
      Product.create({Description:req.body.Description,material_type:req.body.material_type,product_type:req.body.product_type,id:req.body.id,stock:req.body.stock,cost:req.body.cost,pic_url:url},(error, data) => {
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
  
  User.findOneAndRemove({'name':req.body.dname},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

userRoute.route('/readproduct').post((req, res,next) => {
  
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
  console.log("=--------------------")
  console.log(req.body);
  console.log("=--------------------")
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
  
  Cart.find({user_id:req.body.user_id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

userRoute.route('/removecart').post((req, res,next) => {
  
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
  
  console.log("add product");
  uploadFile(req.body.imgSrc,req.body.product_type+"_"+req.body.material_type+"_"+req.body.id+".png",req,res).then(alert)
 
})
function remove(req)
{
 
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