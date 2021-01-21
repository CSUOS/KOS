import React, {
	useState, createRef, useEffect, RefObject
} from 'react';

import { Grid } from '@material-ui/core';

import {
	AttributeSelect as Menu, AttributeButton as Attribute, ValueField as Value, ValueSelect as Select
} from '.';

const getEditable = (type: string | undefined) => {
	if (type === 'creator' ||
		type === 'created' ||
		type === 'modified' ||
		type === 'editor') {
		return false;
	}
	return true;
};

const getCreatable = (type: string | undefined) => {
	if (type === 'single-select' ||
		type === 'multi-select' ||
		type === 'multi-checkbox' ||
		type === 'state') {
		return true;
	}
	return false;
};

const getClass = (creatable: boolean, editable: boolean) => {
	if (editable) {
		if (creatable) return 1;	// [1] 수정 가능하고 옵션 추가 가능함
		return 2;					// [2] 수정 가능하나 옵션 추가 불가능
	}
	return 3;						// [3] 수정 불가능하고 옵션 추가 불가능
};

const getSelectable = (classIndex: number, type: string | undefined) => {
	if (classIndex === 1 || type === 'member') return true;
	return false;
};

type AttributeValuePairProps = {
	type?: string | undefined;
	attribute?: string | undefined;
	value?: any | undefined;
}

const selectRef = createRef<HTMLDivElement>();
const menuRef = createRef<HTMLDivElement>();

// ======== [ 임시 값들 ] ====================
const optionValues = ['agnes obel', 'archive', 'lana del rey', 'kodaline'];
const defaultValue = ['archive'];

const AttributeValuePair = ({
	type, attribute, value
}: AttributeValuePairProps) => {
	const editable = getEditable(type);
	const creatable = getCreatable(type);
	const classIndex = getClass(creatable, editable);
	const selectable = getSelectable(classIndex, type);

	const [menuOpen, setMenuOpen] = useState(false);
	const [newName, setNewName] = useState('속성 이름');

	// for selectable
	const [options, setOptions] = useState(optionValues);
	const [selectOpen, setSelectOpen] = useState(false);

	// for creatable
	const [selectedOptions, setSelectedOptions] = useState(defaultValue);
	const [newOption, setNewOption] = useState('');

	// for not creatable
	const [singleValue, setSingleValue] = useState('archive');

	const handleMenuOpen = () => {
		setMenuOpen(true);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	const handleNameChange = (e: any) => {
		setNewName(e.target.value);
	};

	const handleValueChange = (arg: any) => {
		setSingleValue(arg);
	};

	const handleInputChange = (input: string) => {
		setNewOption(input);
	};

	const handleSelectOpen = () => {
		setSelectOpen(true);
	};

	const handleSelectClose = () => {
		setSelectOpen(false);
		setNewOption('');
	};

	const selectOption = (selectedValue: string) => {
		if (!selectedOptions.includes(selectedValue)) {
			if (type === 'single-select') {
				setSelectedOptions([selectedValue]);
			} else {
				setSelectedOptions([...selectedOptions, selectedValue]);
			}
		}
	};

	const addOption = () => {
		if (!options.includes(newOption)) {
			if (type === 'single-select') {
				setSelectedOptions([newOption]);
			} else {
				setSelectedOptions([...selectedOptions, newOption]);
			}
			setOptions([...options, newOption]);
		}
	};

	const handleOutsideClick = (
		e: any, refObject: RefObject<HTMLElement>, callback: () => void
	) => {
		if (refObject.current && !refObject.current.contains(e.target)) {
			callback();
			console.log('handleOutsideClick 실행');
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
					type={type}
					name={attribute}
					menuOpen={menuOpen}
					handleMenuOpen={handleMenuOpen}
					handleMenuClose={handleMenuClose}
				/>
				<Grid className="value">
					<Value
						type={type}
						value={selectable ? selectedOptions : singleValue}
						editable={editable}
						creatable={creatable}
						selectable={selectable}
						selectOpen={selectOpen}
						addOption={addOption}
						newOption={newOption}
						handleValueChange={handleValueChange}
						handleInputChange={handleInputChange}
						handleSelectOpen={handleSelectOpen}
						handleSelectClose={handleSelectClose}
					/>
					{selectable && selectOpen &&
						<Select
							ref={selectRef}
							options={options}
							creatable={creatable}
							newOption={newOption}
							selectOption={selectOption}
							addOption={addOption}
							handleSelectClose={handleSelectClose}
						/>}
				</Grid>
			</Grid>
			{ menuOpen &&
				<Menu
					ref={menuRef}
					text={newName}
					handleInputChange={handleNameChange}
					handleMenuClose={handleMenuClose}
				/>}
		</>
	);
};

AttributeValuePair.defaultProps = {
	type: 'add-button',
	attribute: '속성 이름',
	value: undefined,
};

export default AttributeValuePair;
