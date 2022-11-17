const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    estTime: String,
    dueDate: Date,
    priority: String,
    subTasks: [String],
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
    budget: String,
    cost: String,
    dueDate: Date,
    documents: String,
    messages: String
})


module.exports = mongoose.model('Project', ProjectSchema)