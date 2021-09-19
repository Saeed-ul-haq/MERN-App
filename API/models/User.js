const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength:6
  },
  image: {
    type: String,
    required: true
  },
  places: [{
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true
}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
