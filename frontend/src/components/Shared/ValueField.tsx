import React, { ChangeEvent, KeyboardEvent } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import {
	DatePicker, SelectItem, Checkbox, TextField, Tag, URL
} from '.';

const getWhetherItHasHoverEvent = (
	editable: boolean,
	selectable: boolean,
	selectOpen: boolean,
	type: string
) => {
	if (editable && type !== 'checkbox' && type !== 'description') {
		if ((selectable && !selectOpen) || !selectable) return true;
	}
	return false;
};

type ValueFieldProps = {
	type: string;
	value?: any | undefined;
	creatable: boolean;
	editable: boolean;
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
	type, value, creatable, selectable, editable, selectOpen,
	newOption, createOption, deleteSelectedOption,
	handleSingleValueChange, handleSelectInputChange,
	handleSelectOpen, handleSelectClose
}: ValueFieldProps) => {
	const hasHoverEvent = getWhetherItHasHoverEvent(editable, selectable, selectOpen, type);

	const onSelectOpenButtonClick = () => {
		if (!selectOpen) {
			handleSelectOpen();
		}
	};

	const handleSelectInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			createOption();
			handleSelectClose();
		}
	};

	const getValueComponent = (attributeType:string) => {
		switch (attributeType) {
		case ('creator' || 'editor'): return value;
		case 'text-field':
			return <TextField value={value} handleValueChange={handleSingleValueChange} />;
		case ('date-picker' || 'deadline' || 'createdAt' || 'updatedAt'):
			return (
				<DatePicker
					value={value}
					editable={editable}
					handleValueChange={handleSingleValueChange}
				/>);
		case 'checkbox':
			return <Checkbox value={value} handleValueChange={handleSingleValueChange} />;
		case 'url':
			return <URL value={value} handleValueChange={handleSingleValueChange} />;
		case ('single-select' || 'multi-select' || 'state'):
			return value.map((option: string) => (
				<SelectItem
					value={option}
					hasCloseBtn={true}
					handleSelectedDelete={deleteSelectedOption}
				/>));
		case 'member':
			return value.map((option: string) => (
				<Tag
					value={option}
					handleTagDelete={deleteSelectedOption}
				/>));
		default:
			return undefined;
		}
	};

	return (
		<Grid className="valuefield">
			<button
				type="button"
				className={clsx('value', hasHoverEvent && 'editable')}
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
