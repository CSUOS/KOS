import React, {
	createRef, forwardRef, useState, useEffect
} from 'react';

import { Grid, Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
	SelectItem, Tag, Button, ValueSelectOptionSetting as SettingWindow
} from '.';
import { handleOutsideClick } from '../../function/FunctionManager';
import { COLORS } from '../../function/PairManager';

const settingWindowRef = createRef<HTMLDivElement>();

type ValueSelectProps = {
	type: string,
	options?: Array<any> | undefined,
	creatable: boolean,
	newOption?: string | undefined,
	selectOption: (arg: string) => void,
	createOption: () => void,
	deleteOption: (optionNameToDelete:string) => void;
	changeOptionColor: (optionToChange:string, colorToChange:string) => void;
	handleSelectClose: () => void,
};

const buttonName = '추가하기';
const tooltip = '옵션 설정하기';
const ValueSelect = forwardRef<HTMLDivElement, ValueSelectProps>(({
	type, options, creatable, newOption,
	selectOption, createOption, deleteOption,
	changeOptionColor, handleSelectClose
}, ref) => {
	const [settingWindowOpen, setSettingWindowOpen] = useState(Array(options?.length).fill(false));
	const handleSettingWindowOpen = (index:number) => {
		const editedOpen = settingWindowOpen.slice();
		editedOpen[index] = true;
		setSettingWindowOpen(editedOpen);
	};

	const handleSettingWindowClose = (index:number) => {
		const editedOpen = settingWindowOpen.slice();
		editedOpen[index] = false;
		setSettingWindowOpen(editedOpen);
	};

	const onOptionClick = (e: any) => {
		const clickedOption = e.target.value;
		if (clickedOption !== undefined) selectOption(clickedOption);
		handleSelectClose();
	};

	const onAddOptionClick = () => {
		createOption();
		handleSelectClose();
	};

	const handleOptionDelete = (optionNameToDelete:string) => {
		deleteOption(optionNameToDelete);
	};

	// useEffect(() => {
	// 	document.addEventListener('mousedown',
	// 		(e: any) => handleOutsideClick(e, settingWindowRef, handleSettingWindowClose), true);
	// 	return () => {
	// 		document.removeEventListener('mousedown',
	// 			(e: any) => handleOutsideClick(e, settingWindowRef, handleSettingWindowClose), true);
	// 	};
	// });

	return (
		<Grid ref={ref} className="valueselect">
			<Paper className="container" elevation={5}>
				<Grid className="tooltip">
					{type === 'member' ? '클릭하여 멤버 추가' : '입력하여 옵션 생성 또는 클릭하여 옵션 추가'}
				</Grid>
				{options && options.map((option, index) => (
					<>
						<Grid className="item">
							<button
								className="selectbtn"
								type="button"
								onClick={onOptionClick}
								value={option.name}
							>
								{type === 'member'
									? (
										<Tag
											value={option.name}
											hasCloseBtn={false}
										/>)
									: (
										<SelectItem
											value={option.name}
											color={option.color}
										/>)}
							</button>
							{type !== 'member' &&
								<Button
									classList={['']}
									value={<MoreVertIcon />}
									transparent={true}
									tooltip={tooltip}
									onClickFun={settingWindowOpen[index] ?
										() => handleSettingWindowClose(index) : () => handleSettingWindowOpen(index)}
								/>}
						</Grid>
						{settingWindowOpen[index] &&
							<Grid
								ref={settingWindowRef}
								className="optionsettingwindow"
							>
								<SettingWindow
									optionName={option.name}
									handleOptionColor={changeOptionColor}
									handleOptionDelete={() => handleOptionDelete(option.name)}
									handleSettingWindowClose={() => handleSettingWindowClose(index)}
								/>
							</Grid>}
					</>
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
								<SelectItem value={newOption} color={COLORS[0]} />
								{buttonName}
							</button>
						</Grid>
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
