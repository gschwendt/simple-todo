import * as React from 'react';
import TodoItem from './TodoListItem';
import './TodoList.css';

const TodoList = props => {
	const { items } = props;

	if(items.length > 0){
		const mappedItems = items.map(item => {
			return (
				<TodoItem
					key={item.uuid}
					item={item}
					handleCompleteItem={props.handleCompleteItem}
					handleDeleteItem={props.handleDeleteItem}
					handleEditItemString={props.handleEditItemString}
					handleEditItem={props.handleEditItem}
					handleCancelEditItem={props.handleCancelEditItem}
					handleEditItemSave={props.handleEditItemSave}
					/>
			);
		});

		return (
			<div className={`todo-items-${props.type}`}>
				{mappedItems}
			</div>
		);
	} else {
		return null;
	}
}

export default TodoList;