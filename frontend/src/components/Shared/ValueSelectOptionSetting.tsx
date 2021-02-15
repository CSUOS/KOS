import React from 'react';
import clsx from 'clsx';

import { Grid, Paper } from '@material-ui/core';

import { COLORS } from '../../function/PairManager';

const getColorText = (color:string) => {
	switch (color) {
	case 'yellow': return '노란색';
	case 'mint': return '민트색';
	case 'green': return '연두색';
	case 'pink': return '분홍색';
	case 'purple': return '보라색';
	case 'blue': return '하늘색';
	default: return '알 수 없음';
	}
};

type ColorButtonProps = {
	color: string;
	onColorButtonClick: (e: any) => void;
}
const ColorButton = ({ color, onColorButtonClick }: ColorButtonProps) => (
	<Grid className="colorbutton">
		<button
			type="button"
			onClick={onColorButtonClick}
			value={color}
		>
			<div className={clsx('color', color)} />
			{getColorText(color)}
		</button>
	</Grid>
);

type ValueSelectOptionSettingProps = {
	optionName: string;
	handleOptionDelete: () => void;
	handleOptionColor: (optionToChange:string, colorToChange:string) => void;
	handleSettingWindowClose: () => void;
}

const ValueSelectOptionSetting = ({
	optionName, handleOptionDelete, handleOptionColor, handleSettingWindowClose
}: ValueSelectOptionSettingProps) => {
	const onDeleteButtonClick = () => {
		handleOptionDelete();
		handleSettingWindowClose();
	};

	const onColorButtonClick = (e: any) => {
		handleOptionColor(optionName, e.target.value);
		handleSettingWindowClose();
	};

	return (
		<Grid className="valueselectoptionsetting">
			<Paper className="container" elevation={3}>
				<Grid className="deletebutton">
					<button
						type="button"
						onClick={onDeleteButtonClick}
					>
						옵션 삭제하기
					</button>
				</Grid>
				<Grid className="palette">
					<Grid className="subject">색깔 설정하기</Grid>
					<Grid className="colors">
						{COLORS.map((color) => (
							<ColorButton
								color={color}
								onColorButtonClick={onColorButtonClick}
							/>))}
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default ValueSelectOptionSetting;
