const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    rate: Number,
    estTime: Number,
    estCost: Number,
    dueDate: Date,
    priority: String,
    status: String
})

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    company: String,
    description: String,
    tasks: [TaskSchema],
    budget: Number,
    estTime: Number,
    cost: Number,
    dueDate: Date,
    documents: String,
    messages: String
})


module.exports = mongoose.model('Project', ProjectSchema)