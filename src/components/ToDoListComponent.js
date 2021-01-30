import React, { useState } from 'react'
import TaskListComponent from './TaskListComponent'

function TodoListComponent() {
	const [taskList, setTaskList] = useState([])
	const [newTask, setNewTask] = useState({id:'', text: '', isDone: false})

	const handleInputNewTask = (event) => {
		setNewTask({
			id: Date.now(),
			text: event.target.value,
			isDone: false
		})
	}

	const addNewTask = (e) => {
		// check user submit blank input field
		e.preventDefault()
		if(newTask.text !== ''){
			setTaskList(prevList => [...prevList, newTask])
		}
		// clear task input field
		setNewTask({id: '', text: '', isDone: false})
	}

	const handleDeleteTask = (id) => {
		setTaskList(prevList => prevList.filter(item => item.id !== id))
		// console.log(`deleted id = ${id}`)
	}

	const handleUpdateTaskStatus = (id) => {
		const updateStatus = taskList.map(task => {
			if(task.id === id){
				task.isDone = !task.isDone
			}
			return task
		})
		setTaskList(updateStatus)
	}
	
	const handleUpdateTaskText = (id, newtext) => {
		const updateText= taskList.map(task => {
			if(task.id === id){
				task.text = newtext
			}
			return task
		})
		setTaskList(updateText)
	}

	return (
		<div>
			<div className="task-list-title">
				<p>Simple To-Do Lists</p>
			</div>
			<form onSubmit={addNewTask} className="new-task-section">
				<input placeholder="Enter new task" value={newTask.text} required onChange={handleInputNewTask}></input>
				<button type="submit">Add Task</button>
			</form>
			<div className="task-list-section">
				<TaskListComponent tasks={taskList} deleteTask={handleDeleteTask} updateTaskStatus={handleUpdateTaskStatus} updateTaskText={handleUpdateTaskText} />
			</div>
		</div>
	)
}

export default TodoListComponent
