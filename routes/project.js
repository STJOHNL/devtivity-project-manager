const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')
const { ensureAuth } = require('../middleware/auth')

// router.get('/', ensureAuth, projectController.getIndex)
router.post('/create', projectController.postProject)
router.delete('/delete/:id', projectController.deleteProject)


module.exports = router