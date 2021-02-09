import React, { ChangeEvent, KeyboardEvent } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import {
	DatePicker, SelectItem, Checkbox, TextField, Tag, URL
} from '.';

// Get whether the component has hover event
const getWhetherItHasHoverEvent = (
	modifiable: boolean,
	selectable: boolean,
	selectOpen: boolean,
	type: string
) => {
	if (modifiable && type !== 'checkbox' && type !== 'description') {
		if ((selectable && !selectOpen) || !selectable) return true;
	}
	return false;
};

type ValueFieldProps = {
	type: string;
	value?: any | undefined;
	creatable: boolean;
	modifiable: boolean;
	selectable: boolean;
	selectOpen: boolean;
	newOption: string;
	createOption: () => void;
	deleteSelectedOption: (optionToDelete: string) => void;
	handleSingleValueChange: (singleValue: any) => void;
	handleSelectInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSelectOpen: () => void;
	handleSelectClose: () => void;
}

const ValueField = ({
	type, value, creatable, selectable, modifiable, selectOpen,
	newOption, createOption, deleteSelectedOption,
	handleSingleValueChange, handleSelectInputChange,
	handleSelectOpen, handleSelectClose
}: ValueFieldProps) => {
	const hasHoverEvent = getWhetherItHasHoverEvent(modifiable, selectable, selectOpen, type);

	// When button of value field is clicked
	const onSelectOpenButtonClick = () => {
		// if select is closed
		if (!selectOpen) {
			// open select
			handleSelectOpen();
		}
	};

	const handleSelectInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		// if pressed key is 'Enter'
		if (e.key === 'Enter') {
			// create new option by input
			createOption();
			// and Close select
			handleSelectClose();
		}
	};

	// Return custom component corresponding to type of attribute
	const getValueComponent = (attributeType:string) => {
		switch (attributeType) {
		case 'creator':
		case 'modifier':
			return value;
		case 'text-field':
			return <TextField value={value} handleValueChange={handleSingleValueChange} />;
		case 'date-picker':
		case 'deadline':
		case 'createdAt':
		case 'updatedAt':
			return (
				<DatePicker
					value={value}
					modifiable={modifiable}
					handleValueChange={handleSingleValueChange}
				/>);
		case 'checkbox':
			return <Checkbox value={value} handleValueChange={handleSingleValueChange} />;
		case 'url':
			return <URL value={value} handleValueChange={handleSingleValueChange} />;
		case 'single-select':
		case 'multi-select':
		case 'state':
			return value.filter((option: any) => option.selected === true).map((selectedOption: any) => (
				<SelectItem
					value={selectedOption.name}
					color={selectedOption.color}
					hasCloseBtn={true}
					handleSelectedDelete={deleteSelectedOption}
				/>
			));
		case 'member':
			return value.filter((option: any) => option.selected === true).map((selectedOption: any) => (
				<Tag
					value={selectedOption.name}
					handleTagDelete={deleteSelectedOption}
				/>
			));
		default:
			return undefined;
		}
	};

	return (
		<Grid className="valuefield">
			<button
				type="button"
				className={clsx('value', hasHoverEvent && 'modifiable')}
				onClick={selectable ? onSelectOpenButtonClick : undefined}
			>
				{getValueComponent(type)}
				{selectable &&
					<input
						className="option-input"
						type="text"
						placeholder={value.length === 0 ? '옵션을 선택하세요' : ''}
						readOnly={!selectOpen}
						onKeyPress={creatable ? handleSelectInputKeyPress : undefined}
						onChange={handleSelectInputChange}
						value={newOption}
					/>}
			</button>
		</Grid>
	);
};

ValueField.defaultProps = {
	value: undefined,
};

export default ValueField;
