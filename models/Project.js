const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    company: String,
    description: String,
    tasks: [],
    budget: Number,
    estTime: Number,
    cost: Number,
    dueDate: Date,
    documents: String,
    messages: String
})


module.exports = mongoose.model('Project', ProjectSchema)