const User = require('../models/User')
const Project = require('../models/Project')

module.exports = {
    postProject: async (req, res) => {
        try {
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
    }
}