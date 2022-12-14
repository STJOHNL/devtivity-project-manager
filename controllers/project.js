const User = require('../models/User')
const Project = require('../models/Project')

module.exports = {
    // Post project to database
    postProject: async (req, res) => {
        try {
            // Set variable based on admin or users response
            let companyName = req.body.company ? req.body.company : req.user.company
            await Project.create({
                name: req.body.name,
                company: companyName,
                description: req.body.description,
                budget: req.body.budget,
                dueDate: req.body.dueDate
            })
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    },
    // Remove project from database
    deleteProject: async (req, res) => {
        try {
            await Project.findOneAndDelete({ _id: req.params.id })
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
}