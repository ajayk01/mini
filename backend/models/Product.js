const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
    material: {
      type: String
   },
   id:{
      type: Number
   },
   stock: {
      type: Number
   },
   cost: {
    type: Number
   },
   Description: {
      type: String
     },
   pic_url: {
    type: String
 }
}, {
   collection: 'product'
})

module.exports = mongoose.model('Product', Product)