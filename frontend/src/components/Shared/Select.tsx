import React, { useState } from 'react';

import { Grid, Paper } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { Button } from '.';

const buttonName = '추가하기';

type ItemProps = {
	label: string,
	hasCloseBtn?: boolean | undefined,
}

const Item = ({ label, hasCloseBtn }: ItemProps) => (
	<Grid className="tag">
		<span>{label}</span>
		{/* {hasCloseBtn && (
			<Button
				classList={['']}
				value={<CloseSharpIcon />}
				transparent={true}
			/>
		)} */}
	</Grid>
);

Item.defaultProps = {
	hasCloseBtn: false,
};

type SelectProps = {
	type: string,
}
const Select = ({ type }: SelectProps) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState([] as Array<string>);
	const [options, setOptions] = useState(['시작 전', '진행중', '완료', '보류']);
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
			else if (type === 'multi-select') setSelected([...selected, e.target.value]);
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
			<button type="button" className="select-container" onClick={open ? handleDropdownClose : handleDropdownOpen}>
				<Grid className="selected">
					{selected.map((value) => (
						<Item label={value} />
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
									<Item label={value} />
								</button>
							))}
							{newOption &&
								(
									<button type="button" onClick={OnAddOptionClick} value={newOption}>
										<Item label={newOption} />
										{buttonName}
									</button>
								)}
						</Paper>
					</Grid>)}
		</Grid>
	);
};

export default Select;
