const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')
const { ensureAuth } = require('../middleware/auth')

// router.get('/', ensureAuth, projectController.getIndex)
router.post('/add/:id', taskController.postTask)
router.put('/edit/:id', taskController.editTask)
router.delete('/delete/:id', taskController.deleteTask)

module.exports = router