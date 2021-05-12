const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
// Define collection and schema
let Cart = new Schema({
    material: {
      type: String
   },
   user_id:{
       type:String
   },
   product_id:{
      type: String
   },
   cost: {
    type: Number
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