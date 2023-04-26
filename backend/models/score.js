const mongoose = require('mongoose')
const scoreSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
    },
    score:{
        type: Number,
        required: true,
        validate:{
            validator: Number.isInteger,
            message:'{VALUE} is not an integer value'
        }
    }
})

scoreSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score