const User = require('../models/User')
const Project = require('../models/Project')

module.exports = {
    // Add task to project
    postTask: async (req, res) => {
        try {
            // Calculate estimated cost based on time/rate
            let taskEstCost = req.body.estTime * req.body.rate
            // Find project model and push task to task array
            await Project.findOneAndUpdate({ _id: req.params.id },
                {
                    $push: {
                        tasks: {
                            taskName: req.body.taskName,
                            taskDescription: req.body.taskDescription,
                            rate: req.body.rate,
                            estTime: req.body.estTime,
                            estCost: taskEstCost,
                            priority: req.body.priority,
                            dueDate: req.body.dueDate,
                            subTasks: req.body.subTasks,
                            status: req.body.status
                        }
                    }
                })
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    },
    // Update existing task
    editTask: async (req, res) => {
        try {
            await Project.findOneAndUpdate({ _id: req.params.id },
                {
                    tasks: {
                        taskName: req.body.taskName,
                        taskDescription: req.body.taskDescription,
                        rate: req.body.rate,
                        estTime: req.body.estTime,
                        estCost: taskEstCost,
                        priority: req.body.priority,
                        dueDate: req.body.dueDate,
                        subTasks: req.body.subTasks,
                        status: req.body.status
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    // Remove task
    deleteTask: async (req, res) => {
        try {
            await Project.updateMany({
                $pull: {
                    tasks: {
                        _id: req.params.id
                    }
                }
            })
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
}