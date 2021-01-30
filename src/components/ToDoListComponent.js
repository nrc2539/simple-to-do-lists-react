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

	const addNewTask = () => {
		// check user submit blank input field
		if(newTask.text !== ''){
			setTaskList(prevList => [...prevList, newTask])
		}else{
			console.log('Please input your task')
		}
		// clear task input field
		setNewTask({id: '', text: '', isDone: false})
	}

	const handleDeleteTask = (id) => {
		setTaskList(prevList => prevList.filter(item => item.id !== id))
		console.log(`deleted id = ${id}`)
	}

	const handleUpdateTask = (id) => {
		const updateTaskList = taskList.map(task => {
			if(task.id === id){
				task.isDone = !task.isDone
			}
			return task
		})
		setTaskList(updateTaskList)
	}

	return (
		<div>
			<div className="task-list-title">
				<p>Simple To-Do Lists</p>
			</div>
			<div className="new-task-section">
				<input placeholder="Enter task" value={newTask.text} onChange={handleInputNewTask}></input>
				<button onClick={addNewTask}>Add Task</button>
			</div>
			<div className="task-list-section">
				<TaskListComponent tasks={taskList} deleteTask={handleDeleteTask} updateTask={handleUpdateTask} />
			</div>
		</div>
	)
}

export default TodoListComponent
