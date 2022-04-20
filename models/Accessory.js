const mongoose = require('mongoose')

const { Schema } = mongoose

const accessorySchema = mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    cubes: [{type: Schema.Types.ObjectId, ref: 'Cube'}]
})

module.exports = mongoose.model('Accessory', accessorySchema)