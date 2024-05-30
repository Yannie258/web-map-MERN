const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeoSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        index:"2dsphere",
        required: true
    }
})

const PropertiesSchema = new Schema({
    OBJECTID: { type: Number},
    ID: { type: Number },
    TYP: { type: Number },
    ART: { type: String },
    STANDORTTYP: { type: String },
    BEZEICHNUNG: { type: String },
    BEZEICHNUNGZUSATZ: { type: String },
    KURZBEZEICHNUNG: { type: String },
    STRASSE: { type: String },
    PLZ: { type: String },
    ORT: { type: String },
    TELEFON: { type: String },
    FAX: { type: String },
    EMAIL: { type: String },
})

const FeatureSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    properties: PropertiesSchema,
    geometry: GeoSchema
})

// Define schemas for each category

// Schools Schema
const CategoriesSchema = new Schema({
    name: { //datasettype name
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    feature: FeatureSchema
});

module.exports = mongoose.model('Categories', CategoriesSchema, 'WEB_MAP_CATEGORIES')
