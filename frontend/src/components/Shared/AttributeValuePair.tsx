import React, {
	useState, createRef, useEffect, RefObject
} from 'react';

import { Grid } from '@material-ui/core';

import {
	AttributeSelect as Menu, AttributeButton as Attribute, ValueField as Value, ValueSelect as Select
} from '.';
import { handleOutsideClick, checkIsStringEmpty } from '../../function/FunctionManager';

const getEditable = (type: string) => {
	if (type === 'creator' ||
		type === 'createdAt' ||
		type === 'updatedAt' ||
		type === 'editor' ||
		type === 'add-button') {
		return false;
	}
	return true;
};

const getSelectable = (type: string) => {
	if (type === 'single-select' ||
		type === 'multi-select' ||
		type === 'state' ||
		type === 'member') {
		return true;
	}
	return false;
};

const getMultiSelectable = (type: string, selectable: boolean) => {
	if (selectable) {
		if (type === 'multi-select' || type === 'member') return true;
		return false;
	}
	return undefined;
};

const getCreatable = (type:string, selectable: boolean) => {
	if (selectable) {
		if (type === 'member') return false;
		return true;
	}
	return false;
};

const getClass = (editable: boolean, creatable: boolean) => {
	if (editable) {
		if (creatable) return 1;	// [1] 수정 가능, 옵션 선택 가능, 옵션 추가 가능
		return 2;					// [2] 수정 가능, 옵션 선택 가능, 옵션 추가 불가능
	}
	return 3;						// [3] 수정 불가능
};

type AttributeValuePairProps = {
	index: number;
	type: string;
	name?: string | undefined;
	value?: any | undefined;
	handlePairAdd?: (pairToAdd: any) => void | undefined;
	handlePairDelete?: (indexToDelete: number) => void | undefined;
}

const selectRef = createRef<HTMLDivElement>();
const menuRef = createRef<HTMLDivElement>();

const AttributeValuePair = ({
	index, type, name, value, handlePairAdd, handlePairDelete
}: AttributeValuePairProps) => {
	// Get editable, selectable, multiSelectable, creatable of type
	const editable = getEditable(type);
	const selectable = getSelectable(type);
	const multiSelectable = getMultiSelectable(type, selectable);
	const creatable = getCreatable(type, selectable);

	// for menu to create attribute value pair
	const [menuOpen, setMenuOpen] = useState(false);
	const [newName, setNewName] = useState('');

	// for selectable
	const [selectOpen, setSelectOpen] = useState(false);
	const [options, setOptions] = useState(selectable && value.options);
	const [selectedOptions, setSelectedOptions] = useState(selectable && value.selectedOptions);

	// for creatable
	const [newOption, setNewOption] = useState('');

	// for not creatable
	const [singleValue, setSingleValue] = useState(!selectable && value);

	const handleMenuOpen = () => {
		setMenuOpen(true);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
		setNewName('');
	};

	const handleNameInputChange = (e: any) => {
		setNewName(e.target.value);
	};

	const handleSingleValueChange = (arg: any) => {
		setSingleValue(arg);
	};

	const handleSelectInputChange = (input: string) => {
		setNewOption(input);
	};

	const handleSelectOpen = () => {
		setSelectOpen(true);
	};

	const handleSelectClose = () => {
		setSelectOpen(false);
		setNewOption('');
	};

	const deleteSelectedOption = (optionToDelete: string) => {
		const edited =
			selectedOptions.filter((selectedOption: string) => selectedOption !== optionToDelete);
		setSelectedOptions(edited);
	};

	const selectOption = (selectedValue: string) => {
		if (!selectedOptions.includes(selectedValue)) {
			if (multiSelectable) setSelectedOptions([...selectedOptions, selectedValue]);
			else setSelectedOptions([selectedValue]);
		}
	};

	const createOption = () => {
		const isNewOptionTextEmpty = checkIsStringEmpty(newOption);
		if (!isNewOptionTextEmpty) {
			if (!options.includes(newOption)) {
				if (multiSelectable) setSelectedOptions([...selectedOptions, newOption]);
				else setSelectedOptions([newOption]);
				setOptions([...options, newOption]);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown',
			(e: any) => handleOutsideClick(e, selectRef, handleSelectClose), true);
		return () => {
			document.removeEventListener('mousedown',
				(e: any) => handleOutsideClick(e, selectRef, handleSelectClose), true);
		};
	});

	useEffect(() => {
		document.addEventListener('mousedown',
			(e: any) => handleOutsideClick(e, menuRef, handleMenuClose), true);
		return () => {
			document.removeEventListener('mousedown',
				(e: any) => handleOutsideClick(e, menuRef, handleMenuClose), true);
		};
	});

	return (
		<>
			<Grid className="attributevaluepair">
				<Attribute
					index={index}
					type={type}
					name={name}
					menuOpen={menuOpen}
					handleMenuOpen={handleMenuOpen}
					handleMenuClose={handleMenuClose}
					handlePairDelete={handlePairDelete}
				/>
				<Grid className="value">
					<Value
						type={type}
						value={selectable ? selectedOptions : singleValue}
						editable={editable}
						selectable={selectable}
						creatable={creatable}
						newOption={newOption}
						selectOpen={selectOpen}
						createOption={createOption}
						deleteSelectedOption={deleteSelectedOption}
						handleSingleValueChange={handleSingleValueChange}
						handleSelectInputChange={handleSelectInputChange}
						handleSelectOpen={handleSelectOpen}
						handleSelectClose={handleSelectClose}
					/>
					{selectable && selectOpen &&
						<Select
							ref={selectRef}
							type={type}
							options={options}
							creatable={creatable}
							newOption={newOption}
							selectOption={selectOption}
							createOption={createOption}
							handleSelectClose={handleSelectClose}
						/>}
				</Grid>
			</Grid>
			{ menuOpen &&
				<Menu
					ref={menuRef}
					text={newName}
					handleNameInputChange={handleNameInputChange}
					handleMenuClose={handleMenuClose}
					handlePairAdd={handlePairAdd}
				/>}
		</>
	);
};

AttributeValuePair.defaultProps = {
	name: undefined,
	value: undefined,
	handlePairAdd: undefined,
	handlePairDelete: undefined,
};

export default AttributeValuePair;
