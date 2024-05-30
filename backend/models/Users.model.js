const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    homeAdress: {
        type: String,
        required: false,
    },
    favourite: {
        category: { type: String, required: true }, // Category name
        location: { type: Schema.Types.ObjectId, ref: 'Categories' }, // Reference to location in Categories collection
    }
  
  
})
module.exports = mongoose.model('Users', UserSchema, 'WEB_MAP_USERS')
//module.exports = mongoose.model("People", PersonSchema, "YOUR COLLECTION");
// Third parameter should match to your collection name, for example db.<name>.
