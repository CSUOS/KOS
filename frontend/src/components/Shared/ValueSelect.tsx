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
	createOption: () => void,
	handleSelectClose: () => void,
};

const buttonName = '추가하기';
const tooltip = '옵션 설정하기';
const ValueSelect = forwardRef<HTMLDivElement, ValueSelectProps>(({
	type, options, creatable, newOption, selectOption, createOption, handleSelectClose
}, ref) => {
	const onOptionClick = (e: any) => {
		selectOption(e.target.value);
		handleSelectClose();
	};

	const onAddOptionClick = () => {
		createOption();
		handleSelectClose();
	};

	return (
		<Grid ref={ref} className="valueselect">
			<Paper className="container" elevation={5}>
				<Grid className="tooltip">
					{type === 'member' ? '클릭하여 멤버 추가' : '입력하여 옵션 생성 또는 클릭하여 옵션 추가'}
				</Grid>
				{options && options.map((option) => (
					<Grid className="item">
						<button
							className="selectbtn"
							type="button"
							onClick={onOptionClick}
							value={option}
						>
							{type === 'member'
								? (
									<Tag
										value={option}
										hasCloseBtn={false}
									/>)
								: <SelectItem value={option} />}
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
						<Grid className="item">
							<button
								className="selectbtn"
								type="button"
								onClick={onAddOptionClick}
								value={newOption}
							>
								<SelectItem value={newOption} />
								{buttonName}
							</button>
						</Grid>
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
