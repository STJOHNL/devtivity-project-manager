const Project = require('../models/Project')
const User = require('../models/User')

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (req.user.admin) {
                const projectItems = await Project.find()
                const users = await User.find()
                res.render('dashboard.ejs',
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
    getCompanyDashboard: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
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