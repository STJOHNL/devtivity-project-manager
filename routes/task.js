const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')
const { ensureAuth } = require('../middleware/auth')

// router.get('/', ensureAuth, projectController.getIndex)
router.post('/add/:id', taskController.postTask)


module.exports = router