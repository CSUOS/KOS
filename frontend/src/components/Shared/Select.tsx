import React, { useState } from 'react';

import { Grid, Paper } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { Button } from '.';

const buttonName = '추가하기';

type ItemProps = {
	label: string,
	hasCloseBtn?: boolean | undefined,
	type: string,
}

const Item = ({ label, type, hasCloseBtn }: ItemProps) => (
	<Grid className="tag">
		{type === 'people' ? (
			<>
				<span>{label}</span>
				{ hasCloseBtn && (<Button
					classList={['']}
					value={<CloseSharpIcon />}
					transparent={true}
				/>)}
			</>) : <span className="item">{label}</span>}

	</Grid>
);

Item.defaultProps = {
	hasCloseBtn: undefined,
};

type SelectProps = {
	type: string,
	creatable: boolean,
	values: Array<string>,
	defaultValue: Array<string>,
}

const Select = ({
	type, creatable, values, defaultValue
}: SelectProps) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(defaultValue);
	const [options, setOptions] = useState(values);
	const [newOption, setNewOption] = useState('');

	const handleDropdownOpen = () => {
		setOpen(true);
	};

	const handleDropdownClose = () => {
		setOpen(false);
		setNewOption('');
	};

	const handleInputChange = (e: any) => {
		setNewOption(e.target.value);
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			OnAddOptionClick();
		}
	};

	const OnOptionClick = (e: any) => {
		if (selected.length === 0 || selected.includes(e.target.value) === false) {
			if (type === 'single-select') setSelected([e.target.value]);
			else if (type === 'multi-select' || type === 'people') setSelected([...selected, e.target.value]);
		}

		handleDropdownClose();
	};

	const OnAddOptionClick = () => {
		if (newOption !== '') {
			if (selected.length === 0 || selected.includes(newOption) === false) {
				setOptions([...options, newOption]);

				if (type === 'single-select') setSelected([newOption]);
				else if (type === 'multi-select') setSelected([...selected, newOption]);
			}
		}

		handleDropdownClose();
	};

	return (
		<Grid className="select">
			<button type="button" className="select-container" onClick={open ? handleDropdownClose : handleDropdownOpen} disabled={newOption.includes(' ')}>
				<Grid className="selected">
					{selected.map((value) => (
						<Item label={value} type={type} hasCloseBtn={true} />
					))}
				</Grid>
				<input type="text" readOnly={!open} onChange={handleInputChange} value={newOption} onKeyPress={handleKeyPress} />
			</button>
			{open &&
				(
					<Grid className="dropdown-container">
						<Paper className="dropdown" elevation={5}>
							{options.map((value) => (
								<button type="button" onClick={OnOptionClick} value={value}>
									<Item label={value} type={type} />
								</button>
							))}
							{(creatable && newOption) &&
								(
									<button type="button" onClick={OnAddOptionClick} value={newOption}>
										<Item label={newOption} type={type} />
										{buttonName}
									</button>
								)}
						</Paper>
					</Grid>)}
		</Grid>
	);
};

export default Select;
