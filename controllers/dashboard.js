const Project = require('../models/Project')
const Task = require('../models/Task')
const User = require('../models/User')

module.exports = {
    // Return admin dashboard
    getAdminDashboard: async (req, res) => {
        try {
            // Return active user data
            const user = await User.findById(req.user.id)
            // Return all projects and users if admin
            if (req.user.admin) {
                const projectItems = await Project.find()
                const users = await User.find()
                res.render('adminDashboard.ejs',
                    {
                        users: users,
                        projects: projectItems,
                        user: user
                    })
            } else {
                res.redirect(`/dashboard/${req.user.company}`)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // Return dashboard for users company/projects
    getCompanyDashboard: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            // Ensure user belongs to copany or is an admin
            if (req.user.company === req.params.company || req.user.admin) {
                const projectItems = await Project.find({ company: req.params.company })
                res.render('dashboard.ejs',
                    {
                        projects: projectItems,
                        user: user
                    })
            } else {
                res.send({ message: 'You do not have access to this company.' })
            }
        } catch (err) {
            console.log(err)
        }
    },
}