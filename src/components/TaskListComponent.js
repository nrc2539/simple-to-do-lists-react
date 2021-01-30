import React, {useState} from 'react'
import { DeleteOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';

function TaskListComponent(props) {
	const tasks = props.tasks
	const [showActionsBtn, setshowActionsBtn] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [currentId, setCurrentId] = useState(0)
	const [currentText, setCurrentText] = useState('')
	const doneTaskStyle = {
		display:'flex',
		height: '100%',
		width: '100%',
		alignItems: 'center',
		color: 'grey',
		textDecoration: 'line-through',
		cursor: 'pointer'
	}
	const toDoTaskStyle = {
		display:'flex',
		height: '100%',
		width: '100%',
		alignItems: 'center',
		cursor: 'pointer'
	}

	const handleMouseOver = (id) => {
		setCurrentId(id)
		setshowActionsBtn(true)
	}

	const handleMouseLeave = () => {
		setCurrentId(0)
		setshowActionsBtn(false)
	}

	const handleEditText = (id, text) => {
		setEditMode(true)
		setCurrentId(id)
		setCurrentText(text)
	}

	const handleUpdateText = () => {
		props.updateTaskText(currentId, currentText)
		setEditMode(false)
	}

	const handleTaskTextChange = (e) => {
		setCurrentText(e.target.value)
	}

	const taskList = tasks.map(task => (
		<div key={task.id} className="task-list-item" onMouseOver={()=>handleMouseOver(task.id)} onMouseLeave={handleMouseLeave}>
			{ task.isDone ? 
				<div style={doneTaskStyle} onClick={()=> props.updateTaskStatus(task.id)}>
					<CheckOutlined style={{visibility: 'visible'}}/>
					<span>{task.text}</span>
				</div> :
				<div style={toDoTaskStyle} onClick={()=> props.updateTaskStatus(task.id)}>
					<CheckOutlined style={{visibility: 'hidden'}}/>
					<span>{task.text}</span>
				</div>
				
			}
			{ showActionsBtn && (currentId === task.id) ?
				<div className="action-btn" style={{visibility: 'visible'}}>
					<EditOutlined className="edit-icon" onClick={()=>handleEditText(task.id, task.text)} />
					<DeleteOutlined className="delete-icon" onClick={() => props.deleteTask(task.id)} />
				</div> 
				: 
				<div className="action-btn" style={{visibility: 'hidden'}}>
					<EditOutlined  />
					<DeleteOutlined />
				</div>
			}
		</div>
	))
	return (
		<div>
			{	taskList.length !== 0 ? 
				<div className="task-list-content">
					{editMode ? 
						<form onSubmit={handleUpdateText} className="edit-form">
							<input placeholder="edit task" onChange={handleTaskTextChange} value={currentText} required></input>
							<button className="btn-cancel" onClick={()=>setEditMode(false)}>Cancel</button>
							<button className="btn-save" type='submit'>Save</button>
						</form> 
					: taskList}
				</div>
			: null }
			
		</div>
	)
}

export default TaskListComponent
