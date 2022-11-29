const User = require('../models/User')
const Project = require('../models/Project')

module.exports = {
    postTask: async (req, res) => {
        try {
            let taskEstCost = req.body.estTime * req.body.rate
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
    editTask: async (req, res) => {
        try {
            await Project.findOneAndUpdate({ _id: req.params.id },
                {})
        } catch (error) {
            console.log(error)
        }
    },
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