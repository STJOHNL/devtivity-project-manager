const User = require('../models/User')
const Project = require('../models/Project')

module.exports = {
    postTask: async (req, res) => {
        try {
            console.log(req.params)
            await Project.findOneAndUpdate({ _id: req.params.id },
                {
                    $push: {
                        tasks: {
                            taskName: req.body.taskName,
                            taskDescription: req.body.taskDescription,
                            estTime: req.body.estTime,
                            priority: req.body.priority,
                            subTasks: req.body.subTasks,
                            status: req.body.status
                        }
                    }
                })
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
}