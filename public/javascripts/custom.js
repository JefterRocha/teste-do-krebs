const noTasks = '<li class="list-group-item d-flex justify-content-between align-items-center">You have no pending tasks.</li>'
function removeTask(taskId) {
	$('#exampleModalCenter').modal('toggle')
	$.ajax({
		url: `/${ taskId }`,
		type: 'DELETE',
		success: function() {
			$(`li[data-task-id=${ taskId }]`).remove()
			if (!$(`li[data-task-id]`).length) 
				$('ul#taskList').html(noTasks)
		}
	})
		.fail(function (jqXHR, textStatus, msg) {
			console.log(msg)
		})
}

const { pathname } = location,
 [ home, addTask ] = $('nav li')

if (pathname === '/') $(home).addClass('active')
else $(addTask).addClass('active')
