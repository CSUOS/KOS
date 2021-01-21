import React, { forwardRef } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { SelectItem } from '.';

type ValueSelectProps = {
	options?: Array<string> | undefined,
	creatable: boolean,
	newOption?: string | undefined,
	selectOption: (arg: string) => void,
	addOption: () => void,
	handleSelectClose: () => void,
};

const buttonName = ' 추가하기';
const ValueSelect = forwardRef<HTMLDivElement, ValueSelectProps>(({
	options, creatable, newOption, selectOption, addOption, handleSelectClose
}, ref) => {
	const onOptionClick = (e:any) => {
		selectOption(e.target.value);
		handleSelectClose();
	};

	const onAddOptionClick = () => {
		addOption();
		handleSelectClose();
	};

	return (
		<Grid ref={ref} className="valueselect">
			<Paper className="select" elevation={5}>
				{options && options.map((option) => (
					<button
						type="button"
						onClick={onOptionClick}
						value={option}
					>
						<SelectItem option={option} />
					</button>
				))}
				{(creatable && newOption) &&
					(
						<button
							type="button"
							onClick={onAddOptionClick}
							value={newOption}
						>
							<SelectItem option={newOption} />
							{buttonName}
						</button>
					)}
			</Paper>
		</Grid>
	);
});

ValueSelect.defaultProps = {
	options: undefined,
	newOption: undefined,
};

export default ValueSelect;
