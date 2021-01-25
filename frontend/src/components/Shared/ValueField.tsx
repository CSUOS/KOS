import React from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import {
	DatePicker, SelectItem, Checkbox, TextField, Tag,
} from '.';

type ValueFieldProps = {
	type?: string | undefined;
	value?: any | undefined;
	creatable: boolean;
	editable: boolean;
	selectable: boolean;
	selectOpen: boolean;
	newOption: string;
	addOption: () => void;
	deleteSelectedOption: (optionToDelete: string) => void;
	handleValueChange: (arg: any) => void;
	handleInputChange: (arg: string) => void;
	handleSelectOpen: () => void;
	handleSelectClose: () => void;
}

const ValueField = ({
	type, value, creatable, selectable, editable, selectOpen, newOption, addOption, deleteSelectedOption, handleValueChange, handleInputChange, handleSelectOpen, handleSelectClose
}: ValueFieldProps) => {
	const onButtonClick = () => {
		if (!selectOpen) {
			handleSelectOpen();
		}
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			addOption();
			handleSelectClose();
		}
	};
	return (
		<Grid className="valuefield">
			{type !== 'description' && value !== undefined &&
				<button
					type="button"
					className={clsx('value', editable && (selectable ? !selectOpen : true) && 'editable')}
					onClick={onButtonClick}
				>
					{type === 'add-button'}
					{(type === 'creator' || type === 'editor') && value}
					{type === 'text-field' && <TextField value={value} handleValueChange={handleValueChange} />}
					{type === 'url' && <TextField value={value} handleValueChange={handleValueChange} isURL={true} />}
					{(type === 'date-picker' || type === 'deadline' || type === 'createdAt' || type === 'modifiedAt')
						&& <DatePicker value={value} editable={editable} handleValueChange={handleValueChange} />}
					{type === 'checkbox' && <Checkbox value={value} handleValueChange={handleValueChange} />}
					{(type === 'single-select' || type === 'multi-select' || type === 'state')
						&& value.map((option: string) => (
							<SelectItem value={option} hasCloseBtn={true} handleSelectedDelete={deleteSelectedOption} />))}
					{type === 'member' && value.map((option: string) => <Tag value={option} handleTagDelete={deleteSelectedOption} />)}
					{selectable &&
						<input
							className="option-input"
							type="text"
							placeholder={value.length === 0 ? '옵션을 선택하세요' : ''}
							readOnly={!selectOpen}
							onKeyPress={handleKeyPress}
							onChange={(e: any) => handleInputChange(e.target.value)}
							value={newOption}
						/>}
				</button>}
			{/*
			{type === 'link'}
			{type === 'checkbox' && <Checkbox />}
			*/}
			{type === 'description'}
		</Grid>
	);
};

ValueField.defaultProps = {
	type: 'add-button',
	value: undefined,
};

export default ValueField;
