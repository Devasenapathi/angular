const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  country: { type: String , required: true},
  reference: {type: String, required: true},
  pan: { type: String , required:true},
  amount: { type: String , required:true},
  amountfrom: { type: String , required:true},
  state:{ type:String , required:true},
  currency:{ type:String , required:true},
  account:{ type:String , required:true},
  mop:{ type:String , required:true},
  visibile:{type:Boolean,required:true}
});

module.exports = mongoose.model('Post', postSchema);

