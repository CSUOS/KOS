import React from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import {
	DatePicker, SelectItem, Checkbox, TextField, Tag, URL
} from '.';

const getWhetherItHasHoverEvent = (
	editable: boolean, selectable: boolean, selectOpen: boolean, type: string | undefined
) => {
	if (editable && type !== 'checkbox') {
		if ((selectable && !selectOpen) || !selectable) return true;
	}
	return false;
};

type ValueFieldProps = {
	type?: string | undefined;
	value?: any | undefined;
	creatable: boolean;
	editable: boolean;
	selectable: boolean;
	selectOpen: boolean;
	newOption: string;
	createOption: () => void;
	deleteSelectedOption: (optionToDelete: string) => void;
	handleSingleValueChange: (arg: any) => void;
	handleSelectInputChange: (arg: string) => void;
	handleSelectOpen: () => void;
	handleSelectClose: () => void;
}

const ValueField = ({
	type, value, creatable, selectable, editable, selectOpen, newOption, createOption, deleteSelectedOption, handleSingleValueChange, handleSelectInputChange, handleSelectOpen, handleSelectClose
}: ValueFieldProps) => {
	const hasHoverEvent = getWhetherItHasHoverEvent(editable, selectable, selectOpen, type);

	const onSelectOpenButtonClick = () => {
		if (!selectOpen) {
			handleSelectOpen();
		}
	};

	const handleSelectInputKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			createOption();
			handleSelectClose();
		}
	};
	return (
		<Grid className="valuefield">
			{type !== 'description' && (
				selectable ?
					<button
						type="button"
						className={clsx('value', hasHoverEvent && 'editable')}
						onClick={onSelectOpenButtonClick}
					>
						{(type === 'single-select' || type === 'multi-select' || type === 'state')
							&& value.map((option: string) => (
								<SelectItem value={option} hasCloseBtn={true} handleSelectedDelete={deleteSelectedOption} />))}
						{type === 'member' && value.map((option: string) => <Tag value={option} handleTagDelete={deleteSelectedOption} />)}
						<input
							className="option-input"
							type="text"
							placeholder={value.length === 0 ? '옵션을 선택하세요' : ''}
							readOnly={!selectOpen}
							onKeyPress={creatable ? handleSelectInputKeyPress : undefined}
							onChange={(e: any) => handleSelectInputChange(e.target.value)}
							value={newOption}
						/>
					</button>
					:
					<button
						type="button"
						className={clsx('value', hasHoverEvent && 'editable')}
					>
						{type === 'add-button'}
						{(type === 'creator' || type === 'editor') && value}
						{type === 'text-field' && <TextField value={value} handleValueChange={handleSingleValueChange} />}
						{type === 'url' && <URL value={value} handleValueChange={handleSingleValueChange} />}
						{(type === 'date-picker' || type === 'deadline' || type === 'createdAt' || type === 'updatedAt')
							&& <DatePicker value={value} editable={editable} handleValueChange={handleSingleValueChange} />}
						{type === 'checkbox' && <Checkbox value={value} handleValueChange={handleSingleValueChange} />}
					</button>
			)}
			{ type === 'description'}
		</Grid>
	);
};

ValueField.defaultProps = {
	type: 'add-button',
	value: undefined,
};

export default ValueField;
