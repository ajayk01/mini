const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Cart = new Schema({
   user_id:{
       type:String
   },
   product_id:{
      type: String
   },
   cost: {
    type: Number
   },
   product_type: {
      type: String
     },
   material_type: {
      type: String
     },
   pic_url: {
    type: String
 },
 stock:
 {
    type:Number
 }
}, {
   collection: 'cart'
})

module.exports = mongoose.model('cart', Cart)