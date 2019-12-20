/**
*** @author Jefter de A. Rocha <jefterrocha7@gmail.com>
**/

const express = require('express')
const router = express.Router()
const db = require('../db')

const { body, validationResult } = require('express-validator')

router.get('/', (req, res) => {
	const tasks = db.getAll()
	res.render('index', {
		tasks,
		title: 'Tasks Manager',
		screenTitle: 'Tasks List'
	})
})

router.get('/add-task', (req, res) => {
	res.render('create', {
		title: 'New task',
		screenTitle: 'Create new task'
	})
})

router.post('/add-task',
	body('taskContent')
		.isLength({ min: 10 })
		.withMessage('Your task content must be 10 characters or longer.'),
	(req, res) => {
		const errors = validationResult(req)
		const { taskContent } = req.body

		if (!errors.isEmpty())
			return res.render('create', {
				title: 'New task',
				screenTitle: 'Create new task',
				messages: errors.array(),
				alertType: 'danger'
			})

		db.create({ taskContent })
		res.render('create', {
			title: 'New task',
			screenTitle: 'Create new task',
			messages: [ { msg: 'successfully registered.' } ],
			alertType: 'success'
		})
	})

router.delete('/:taskId', (req, res) => {
	const { taskId } = req.params
	const confirm = db.destroy(taskId)
	const message = confirm ? 'successfully deleted' : 'something wrong happened'
	res.json({ success: confirm, message })
})

module.exports = router
