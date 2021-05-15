const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Order = new Schema({
    user_name:{type:String},
    user_email:{type:String},
    user_id:{type: String},
     product_id:{
        type: String
     },
    material: {
      type: String
   },
   cost: {
    type: Number
   },
   total_q:
    {
        type :String
    },
    product_type: {
        type: String
       },
     material_type: {
        type: String
       },
 phone_number: {
     type:Number
 },
 address: {
    type:String
},
pincode: {
    type:Number
}
}, {
   collection: 'order'
})

module.exports = mongoose.model('Order', Order)