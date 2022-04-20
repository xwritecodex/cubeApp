const mongoose = require('mongoose')

const { Schema } = mongoose

const cubeSchema = mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{type: Schema.Types.ObjectId, ref: 'Accessory'}],
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Cube', cubeSchema)