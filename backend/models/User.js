const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   email: {
      type: String
   },
   firstname:{
      type: String
   },
   lastname: {
      type: String
   },
   password: {
      type: String
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)