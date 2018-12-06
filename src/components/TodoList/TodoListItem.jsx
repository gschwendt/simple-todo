import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faCheck,
	faTrashAlt
} from '@fortawesome/free-solid-svg-icons'

const TodoListItem = props => {
	const {item} = props;

	const handleKeyDown = event => {
		if(event.key === 'Enter'){
			props.handleEditItemSave(item);
		} else if(event.key === 'Escape' || event.key === 'Esc'){
			props.handleCancelEditItem(item);
		}
	}

	const handleDoubleClick = item.status === 'Pending' ?
		() => props.handleEditItem(item)
		: null;

	return (
		<div className='todo-item'>
			<div className='todo-item-complete-div'>
			{ item.status !== 'Completed' ?
					<FontAwesomeIcon
						className='todo-item-complete-check'
						icon={faCheck}
						onClick={() => props.handleCompleteItem(item)}
						/>
					: null }
			</div>		
			<div className='todo-item-title-div'>
				{ item.status === 'Edit' ?
					<input
						className='todo-item-title-edit'
						onChange={event => props.handleEditItemString(event, item)}
						value={item.editString}
						onKeyDown={handleKeyDown}
						/>
					: 
					<div 
						className='todo-item-title'
						onDoubleClick={handleDoubleClick}
						title='Double-Click to Edit'
						>
						{item.title}
					</div> }				
			</div>
			<div className='todo-item-delete-div'>
				<FontAwesomeIcon
					className='todo-item-delete-button'
					icon={faTrashAlt}
					onClick={() => props.handleDeleteItem(item)}
					/>
			</div>
			
		</div>
	);
}

export default TodoListItem;