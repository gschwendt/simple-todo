import React, { Component } from 'react';
import './App.css';

import TodoList from './components/TodoList/TodoList';
import AddNewItem from './components/AddNewItem';
import SortPicker from './components/SortPicker/SortPicker';

const uuidv4 = require('uuid/v4');

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			items: [],
			newItemString: '',
			allSortOptions: [
				{name: 'By Created', type: 'numeric', property: 'created'},
				{name: 'By Title', type: 'alpha', property: 'title'},
				{name: 'By Modified', type: 'numeric', property: 'modified'}
			],
			selectedSortOption: 0,
			sortAscending: true
		};

		this.handleNewItemString = this.handleNewItemString.bind(this);
		this.handleAddNewItem = this.handleAddNewItem.bind(this);
		this.handleSortChange = this.handleSortChange.bind(this);
		this.handleSortTypeClick = this.handleSortTypeClick.bind(this);
		this.handleCompleteItem = this.handleCompleteItem.bind(this);
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
		this.handleEditItemString = this.handleEditItemString.bind(this);
		this.handleEditItem = this.handleEditItem.bind(this);
		this.handleCancelEditItem = this.handleCancelEditItem.bind(this);
		this.handleEditItemSave = this.handleEditItemSave.bind(this);
	}

	render() {
		const { items } = this.state;
		const pendingItems = items.filter(item => {
			return item.status === 'Pending' || item.status === 'Edit'
		});
		const completedItems = items.filter(item => item.status === 'Completed');


		return (
			<div className="App">
				<SortPicker
						options={this.state.allSortOptions}
						selectedOption={this.state.selectedSortOption}
						sortAscending={this.state.sortAscending}
						handleSortChange={this.handleSortChange}
						handleSortTypeClick={this.handleSortTypeClick}
						/>
				{ pendingItems.length > 0 ?
					<TodoList
						items={pendingItems}
						handleDeleteItem={this.handleDeleteItem}
						handleCompleteItem={this.handleCompleteItem}
						handleEditItemString={this.handleEditItemString}
						handleEditItem={this.handleEditItem}
						handleCancelEditItem={this.handleCancelEditItem}
						handleEditItemSave={this.handleEditItemSave}
						type='pending'
						/>
					: null }
				<AddNewItem 
					newItemString={this.state.newItemString}
					handleNewItemString={this.handleNewItemString}
					handleAddNewItem={this.handleAddNewItem}
					handleEditItem={this.handleEditItem}
					/>
				{	completedItems.length > 0 ?
					<TodoList
						items={completedItems}
						handleDeleteItem={this.handleDeleteItem}
						handleCompleteItem={this.handleCompleteItem}
						type='completed'
						/>
					: null }
			</div>
		);
	}

	handleNewItemString = event => {
		this.setState({ newItemString: event.target.value });
	}

	handleAddNewItem = () => {
		console.log('handleAddNewItem triggered');
		const { newItemString } = this.state;

		if(newItemString.length > 0){
			const now = new Date();

			let item = {
				uuid: uuidv4(),
				title: newItemString,
				created: now,
				modified: now,
				status: 'Pending'
			}
	
			console.log('item:', item);
	
			let newItems = [...this.state.items];
			newItems.push(item);
	
			this.setState({ 
				items: newItems,
				newItemString: ''
			}, this.sortItems);
		}		
	}

	handleSortTypeClick = (sortAscending) => {
		console.log('handleSortTypeClick triggered');
		console.log('sortAscending:', sortAscending);
		this.setState({ sortAscending: sortAscending }, this.sortItems);
	}

	handleSortChange = event => {
		console.log('handleSortChange triggered');
		console.log('event.target.value:', event.target.value);
		this.setState({selectedSortOption: event.target.value}, this.sortItems);
	}

	sortItems = () => {
		console.log('sortItems triggered');
		const {
			allSortOptions,
			selectedSortOption,
			sortAscending,
			// eslint-disable-next-line
			items
		} = this.state;

		console.log('allSortOptions:', allSortOptions);
		console.log('selectedSortOption index:', selectedSortOption);
		const sortOption = allSortOptions[selectedSortOption];
		const sortProp = sortOption.property;
		console.log('sortOption:', sortOption);
		console.log('sortAscending:', sortAscending);

		const sortedItems = [...items];

		sortedItems.sort((a, b) => {
			if(sortAscending){
				if(a[sortProp] < b[sortProp]){
					return -1;
				} else if(a[sortProp] > b[sortProp]){
					return 1;
				}
				return 0;
			} else {
				if(a[sortProp] > b[sortProp]){
					return -1;
				} else if(a[sortProp] < b[sortProp]){
					return 1;
				} 
				return 0;				
			}
		});

		this.setState({ items: sortedItems })
	}

	handleEditItem = itemToEdit => {
		console.log('handleEditItem triggered');
		console.log('itemToEdit:', itemToEdit);
		const { items } = this.state;

		let i = items.findIndex(item => item.uuid === itemToEdit.uuid);
		let newItems = [...items];
		newItems[i].status = 'Edit'
		newItems[i].editString = itemToEdit.title;
		this.setState({ items: newItems });
	}

	handleEditItemString = (event, itemToEdit) => {
		console.log('handleEditItemString triggered');
		console.log('event.target.value:', event.target.value);
		console.log('itemToEdit:', itemToEdit);
		const { items } = this.state;
		const i = items.findIndex(item => item.uuid === itemToEdit.uuid);
		let newItems = [...items];
		newItems[i].editString = event.target.value;
		this.setState({ items: newItems });
	}

	handleEditItemSave = itemToEdit => {
		console.log('handleEditItemSave triggered');
		console.log('itemToEdit:', itemToEdit);
		const { items } = this.state;
		const now = new Date();
		const i = items.findIndex(item => item.uuid === itemToEdit.uuid);
		let newItems = [...items];
		newItems[i].title = newItems[i].editString;
		newItems[i].status = 'Pending';
		newItems[i].editString = '';
		newItems[i].modified = now;
		this.setState({ items: newItems }, this.sortItems);
	}

	handleCancelEditItem = itemToEdit => {
		console.log('handleCancelEditItem triggered');
		console.log('itemToEdit:', itemToEdit);
		const { items } = this.state;

		let i = items.findIndex(item => item.uuid === itemToEdit.uuid);
		let newItems = [...items];
		newItems[i].status = 'Pending';
		newItems[i].editString = '';
		this.setState({ items: newItems });
	}

	handleCompleteItem = completedItem => {
		console.log('handleCompleteItem triggered');
		console.log('completedItem:', completedItem);
		const { items } = this.state;
		const now = new Date();

		let i = items.findIndex(item => item.uuid === completedItem.uuid);
		console.log('i:', i);
		let newItems = [...items];
		newItems[i].status = 'Completed';
		newItems[i].modified = now;
		console.log('newItems:', newItems);
		this.setState({ items: newItems });
	}

	handleDeleteItem = deletedItem => {
		console.log('handleDeleteItem triggered');
		console.log('deletedItem:', deletedItem);
		const { items } = this.state;

		let newItems = items.filter(item => item.uuid !== deletedItem.uuid);
		if(newItems.length > 0){
			this.setState({ items: newItems });		
		} else {
			this.setState({ items: [] });
		}
	}


}

export default App;
