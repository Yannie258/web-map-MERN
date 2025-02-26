import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

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
        address: { type: String},
        homeLongitude: { type: Number },
        homeLatitude: { type: Number },
    },
    favourite: {
        category: { type: String }, 
        address: { type: String },
        favouriteLongitude: { type: Number },
        favouriteLatitude: { type: Number }
    }
  
})
export default model('Users', UserSchema, 'WEB_MAP_USERS')
//module.exports = mongoose.model("People", PersonSchema, "YOUR COLLECTION");
// Third parameter should match to your collection name, for example db.<name>.
