const express = require('express');
const app = express();
const userRoute = express.Router();

// Employee model
let User = require('../models/User');
let Product = require('../models/Product');
let Cart = require('../models/Cart')
let aws = require('../file_upload_aws')
let Order = require('../models/Order');
let email = require('../email-sender');
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
  // console.log(req);
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
  User.findOneAndUpdate({'name':req.body.nu},{'name':req.body.nu,'email':req.body.eu},(error, data) => {
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
  console.log(req.body);
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

userRoute.route('/addproduct').post((req, res,next) => {
  console.log("add product");
  aws.uploadFile('1.png','sample.jpg');
//  Cart.findOneAndDelete({'product_id':req.body.product_id},(error, data) => {
//     if (error) {
//       return next(error)
//     } else {

//       res.json(data)
//     }
//   })
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



module.exports = userRoute;