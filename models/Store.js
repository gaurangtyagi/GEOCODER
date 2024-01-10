const mongoose = require('mongoose'); 
const geocoder = require('../utils/geocoder'); 
// we take string as address
// geocoder converts that address into point form 
// we do not save string in our database only point address
const StoreSchema = new mongoose.Schema ({
    storeId: {
        type: String, 
        required: [true, 'Please add a store ID'], 
        unique: true, 
        trim: true, 
        maxlength: [10, 'Store ID must be less than 10 chars']
    }, 
    address: {
        type: String, 
        required: [true, 'Please add an address']
    }, 
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'] // 'location.type' must be 'Point'
            // enum means the only values that are going to be allowed are the once inside []
        },
        coordinates: {
            type: [Number],
            index: '2dsphere' // this will allow queries
        }, 
        formattedAddress: String
    }, 
    createdAt: {
        type: Date, 
        default: Date.now()
    }
}); 

// GeoCode & create location

StoreSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address); // this will fetch data from the address we give it 
    console.log(loc); 
    this.location = {
        type: 'Point', 
        coordinates: [loc[0].longitude, loc[0].latitude], 
        formattedAddress: loc[0].formattedAddress
    }; 
    console.log(this); 
    // Do not save address
    this.address = undefined; 
    next(); 
}); 

module.exports = mongoose.model('Store', StoreSchema); 