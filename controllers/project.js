const User = require('../models/User')
const Project = require('../models/Project')

module.exports = {
    postProject: async (req, res) => {
        try {
            await Project.create({
                name: req.body.name,
                company: req.user.company,
                description: req.body.description,
                budget: req.body.budget,
                dueDate: req.body.dueDate
            })
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
}