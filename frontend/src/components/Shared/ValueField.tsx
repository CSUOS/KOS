import React, { useState } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import {
	DatePicker, SelectItem, Checkbox, Checkboxes, TextField,
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
	handleValueChange: (arg:any) => void;
	handleInputChange: (arg: string) => void;
	handleSelectOpen: () => void;
	handleSelectClose: () => void;
}

const ValueField = ({
	type, value, creatable, selectable, editable, selectOpen, newOption, addOption, handleValueChange, handleInputChange, handleSelectOpen, handleSelectClose
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
	const example = new Date();
	return (
		<Grid className="valuefield">
			{type !== 'description' &&
				<button
					type="button"
					className={clsx('value', editable && (selectable ? !selectOpen : true) && 'editable')}
					onClick={onButtonClick}
				>
					{type === 'add-button'}
					{type === 'text-field' && <TextField value={value} handleValueChange={handleValueChange} />}
					{type === 'date-picker' && <DatePicker value={example} />}
					{type === 'checkbox' && <Checkbox />}
					{(type === 'single-select' || type === 'multi-select') &&
					value.map((option:string) => <SelectItem option={option} />)}
					{creatable &&
						<input
							className="option-input"
							type="text"
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
