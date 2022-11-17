const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, dashboardController.getDashboard)
router.get('/:company', ensureAuth, dashboardController.getCompanyDashboard)


module.exports = router