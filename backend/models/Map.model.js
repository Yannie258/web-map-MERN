const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MapSchema = new Schema({
  //@TODO add your required Keys, Datastructures and Schema logic
  userName: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: false,
  },
  favourite: {
    type: String,
    required: false,
  },

})
module.exports = mongoose.model('People', MapSchema, 'WEB_MAP')
//module.exports = mongoose.model("People", PersonSchema, "YOUR COLLECTION");
// Third parameter should match to your collection name, for example db.<name>.
