import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


const AddNewItem = props => {
	const handleKeyPress = event => {
		if(event.key === 'Enter'){
			props.handleAddNewItem();
		}
	}

	return (
		<div className='todo-additem-div' >
			<div style={{flex: 1}} />
			<input
				className='todo-additem-input' 
				onChange={props.handleNewItemString} 
				value={props.newItemString} 
				onKeyPress={handleKeyPress} 
				/>
			<FontAwesomeIcon
				icon={faPlusCircle}
				className='todo-additem-button'
				onClick={props.handleAddNewItem}
				/>
		</div>
	);	
}


export default AddNewItem;