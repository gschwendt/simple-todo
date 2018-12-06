import * as React from 'react';
import './SortPicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faSortNumericUp,
	faSortNumericDown,
	faSortAlphaUp,
	faSortAlphaDown
} from '@fortawesome/free-solid-svg-icons'


const SortPicker = props => {
	const {
		options,
		selectedOption,
		sortAscending
	} = props

	const mappedOptions = options.map((option, i) => {
		return <option key={i} value={i}>{option.name}</option>;
	});

	const sortAscIcon = options[selectedOption].type === 'numeric' ?
		faSortNumericUp : faSortAlphaUp;
	const sortAscClass = sortAscending ? 
		'sort-type-selected' : 'sort-type-notselected';

	const sortDescIcon = options[selectedOption].type === 'numeric' ?
		faSortNumericDown : faSortAlphaDown;
	const sortDescClass = !sortAscending ?
		'sort-type-selected' : 'sort-type-notselected';

	return (
		<div className='sort-picker-div'>
			<div style={{flex: 5}} />
			<div className='sort-picker-select-div'>
				<select 
					className='sort-picker-select'
					value={selectedOption}
					onChange={props.handleSortChange}
					>
					{mappedOptions}
				</select>
			</div>			
			<div className='sort-asc-div'>
				<FontAwesomeIcon
					icon={sortAscIcon}
					className={sortAscClass}
					onClick={() => props.handleSortTypeClick(true)}
					/>
			</div>
			<div className='sort-desc-div'>
				<FontAwesomeIcon
					icon={sortDescIcon}
					className={sortDescClass}
					onClick={() => props.handleSortTypeClick(false)}
					/>
			</div>
			<div style={{flex: 5}} />
		</div>
	)
}

export default SortPicker