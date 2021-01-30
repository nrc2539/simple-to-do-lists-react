import React, {useState} from 'react'
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';

function TaskListComponent(props) {
	const tasks = props.tasks
	const [showDeleteBtn, setShowDeleteBtn] = useState(false)
	const [currentId, setCurrentId] = useState(0)
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

	const handleMouseEnter = (id) => {
		setCurrentId(id)
		setShowDeleteBtn(true)
	}

	const handleMouseLeave = () => {
		setCurrentId(0)
		setShowDeleteBtn(false)
	}

	const taskList = tasks.map(task => (
		<div key={task.id} className="task-list-item" onMouseEnter={()=>handleMouseEnter(task.id)} onMouseLeave={handleMouseLeave}>
			{ task.isDone ? 
				<div style={doneTaskStyle} onClick={()=> props.updateTask(task.id)}>
					<CheckOutlined style={{visibility: 'visible'}}/>
					<span>{task.text}</span>
				</div> :
				<div style={toDoTaskStyle} onClick={()=> props.updateTask(task.id)}>
					<CheckOutlined style={{visibility: 'hidden'}}/>
					<span>{task.text}</span>
				</div>
				
			}
			{ showDeleteBtn && (currentId === task.id) ?
				<DeleteOutlined className='delete-icon' onClick={() => props.deleteTask(task.id)} /> :
				<DeleteOutlined  style={{visibility: 'hidden'}} />
			}
		</div>
	))
	return (
		<div>
			{	taskList.length !== 0 ? 
				<>
					<div className="task-list-content">
						{taskList}
					</div>
				</>
			: null }
			
		</div>
	)
}

export default TaskListComponent
