import React, {
	useState, createRef, useEffect, ChangeEvent
} from 'react';

import { Grid } from '@material-ui/core';

import {
	AttributeSelect as Menu, AttributeButton as Attribute, ValueField as Value, ValueSelect as Select
} from '.';
import { handleOutsideClick, checkIsStringEmpty, getRandomInt } from '../../function/FunctionManager';
import { COLORS } from '../../function/PairManager';

const getmodifiable = (type: string) => {
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

const getCreatable = (type: string, selectable: boolean) => {
	if (selectable) {
		if (type === 'member') return false;
		return true;
	}
	return false;
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
	// Get modifiable, selectable, multiSelectable, creatable of attribute type
	const modifiable = getmodifiable(type);
	const selectable = getSelectable(type);
	const multiSelectable = getMultiSelectable(type, selectable);
	const creatable = getCreatable(type, selectable);

	// for menu to create attribute value pair
	const [menuOpen, setMenuOpen] = useState(false);
	const [newName, setNewName] = useState('');

	// for selectable
	const [selectOpen, setSelectOpen] = useState(false);
	const [options, setOptions] = useState(selectable && value);

	// for creatable
	const [newOptionName, setNewOptionName] = useState('');

	// for not creatable
	const [singleValue, setSingleValue] = useState(!selectable && value);

	const handleMenuOpen = () => {
		setMenuOpen(true);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
		setNewName('');
	};

	const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewName(e.target.value);
	};

	const handleSingleValueChange = (newSingleValue: any) => {
		setSingleValue(newSingleValue);
	};

	const handleSelectInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewOptionName(e.target.value);
	};

	const handleSelectOpen = () => {
		setSelectOpen(true);
	};

	const handleSelectClose = () => {
		setSelectOpen(false);
		setNewOptionName('');
	};

	const getOptionIndexByName = (optionNameToFind: string) => {
		const clickedIndex = options.findIndex((option: any) => option.name === optionNameToFind);
		return clickedIndex;
	};

	const deleteSelectedOption = (optionNameToDelete: string) => {
		const editedOptionIndex = getOptionIndexByName(optionNameToDelete);
		const editedOptions = options.slice();
		const editedOption = { ...editedOptions[editedOptionIndex], selected: false };
		editedOptions[editedOptionIndex] = editedOption;

		setOptions(editedOptions);
	};

	const selectOption = (selectedValue: string) => {
		const selectedOptionIndex = getOptionIndexByName(selectedValue);
		const selectedOption = options[selectedOptionIndex];
		const isSelectedBefore = selectedOption.selected;

		if (!isSelectedBefore) {
			if (multiSelectable) {
				const editedOptions = options.map((option: any, optionIndex: number) => {
					if (optionIndex === selectedOptionIndex) return { ...option, selected: true };
					return option;
				});
				setOptions(editedOptions);
			} else {
				const editedOptions = options.map((option: any, optionIndex: number) => {
					if (optionIndex === selectedOptionIndex) return { ...option, selected: true };
					return { ...option, selected: false };
				});
				setOptions(editedOptions);
			}
		}
	};

	const createOption = () => {
		const isNewOptionTextEmpty = checkIsStringEmpty(newOptionName);
		if (!isNewOptionTextEmpty) {
			const optionIndex = getOptionIndexByName(newOptionName);
			if (optionIndex === -1) {
				const newOption = {
					name: newOptionName,
					selected: false,
					color: COLORS[getRandomInt(0, COLORS.length)]
				};
				setOptions([...options, newOption]);
				// TODO: 생성된 옵션 즉시 선택된 것으로 띄워주기
				// selectOption(newOptionName)
			}
		}
	};

	const deleteOption = (optionNameToDelete:string) => {
		const editedOptions = options.filter((option:any) => option.name !== optionNameToDelete);
		setOptions(editedOptions);
	};

	const changeOptionColor = (optionToChange:string, colorToChange:string) => {
		const editedOptions = options.map((option:any) => {
			if (option.name === optionToChange) return { ...option, color: colorToChange };
			return option;
		});
		setOptions(editedOptions);
	};

	useEffect(() => {
		console.log(options);
	}, [options]);

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
						value={selectable ? options : singleValue}
						modifiable={modifiable}
						selectable={selectable}
						creatable={creatable}
						newOption={newOptionName}
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
							newOption={newOptionName}
							selectOption={selectOption}
							createOption={createOption}
							deleteOption={deleteOption}
							changeOptionColor={changeOptionColor}
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
