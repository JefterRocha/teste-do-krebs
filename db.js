/**
*** @author Jefter de A. Rocha <jefterrocha7@gmail.com>
**/

const uuidv4 = require('uuid/v4')

const taskList = []

function getAll() {
	return taskList
}

/**
 * @param {string} taskId
 */
function destroy(taskId) {
	try {
		const newTasks = taskList.filter(({ _id }) => _id !== taskId)

		while (taskList.length) taskList.pop() // while loop with pop() method is more performatic.
		/* 
			alternative way to clean an array
			tasklist.length = 0
			tasklist.splice(0)
		*/
		taskList.push(...newTasks)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

/**
 * @param {Object} values
 */
function create(values) {
	taskList.push({ ...values, _id: uuidv4() })
}

module.exports = { getAll, create, destroy }


