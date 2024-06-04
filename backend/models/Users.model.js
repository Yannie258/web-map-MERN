const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    homeAddress: {
        address: { type: String, required: true },
        homeLongitude: { type: String, required: true },//|
        homeLatitude: { type: String, required: true },//----
    },
    favourite: {
        category: { type: String, required: true }, // Category name
        favouriteLongitude: { type: String, required: true },//|
        favouriteLatitude: { type: String, required: true }
    }
  
})
module.exports = mongoose.model('Users', UserSchema, 'WEB_MAP_USERS')
//module.exports = mongoose.model("People", PersonSchema, "YOUR COLLECTION");
// Third parameter should match to your collection name, for example db.<name>.
