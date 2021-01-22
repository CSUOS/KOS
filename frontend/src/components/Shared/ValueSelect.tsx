import React, { forwardRef } from 'react';
import { Grid, Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SelectItem, Tag, Button } from '.';

type ValueSelectProps = {
	type?: string | undefined,
	options?: Array<string> | undefined,
	creatable: boolean,
	newOption?: string | undefined,
	selectOption: (arg: string) => void,
	addOption: () => void,
	handleSelectClose: () => void,
};

const buttonName = '추가하기';
const tooltip = '옵션 설정하기';
const ValueSelect = forwardRef<HTMLDivElement, ValueSelectProps>(({
	type, options, creatable, newOption, selectOption, addOption, handleSelectClose
}, ref) => {
	const onOptionClick = (e: any) => {
		selectOption(e.target.value);
		handleSelectClose();
	};

	const onAddOptionClick = () => {
		addOption();
		handleSelectClose();
	};

	return (
		<Grid ref={ref} className="valueselect">
			<Paper elevation={5}>
				{options && options.map((option) => (
					<Grid className="container">
						<button
							className="selectbtn"
							type="button"
							onClick={onOptionClick}
							value={option}
						>
							{type === 'member'
								? <Tag value={option} hasCloseBtn={false} />
								: <SelectItem option={option} />}
						</button>
						{type !== 'member' &&
							<Button
								classList={['']}
								value={<MoreVertIcon />}
								transparent={true}
								tooltip={tooltip}
							/>}
					</Grid>
				))}
				{(creatable && newOption) &&
					(
						<button
							type="button"
							onClick={onAddOptionClick}
							value={newOption}
						>
							{type === 'member'
								? <Tag value={newOption} hasCloseBtn={false} />
								: <SelectItem option={newOption} />}
							{buttonName}
						</button>
					)}
			</Paper>
		</Grid>
	);
});

ValueSelect.defaultProps = {
	type: undefined,
	options: undefined,
	newOption: undefined,
};

export default ValueSelect;
