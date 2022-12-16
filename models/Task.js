const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    projectID: String,
    name: String,
    description: String,
    rate: Number,
    estTime: Number,
    estCost: Number,
    dueDate: Date,
    priority: String,
    status: String
})

module.exports = mongoose.model('Task', TaskSchema)