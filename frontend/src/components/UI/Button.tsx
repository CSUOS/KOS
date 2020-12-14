import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';

/*
	사용예시
	<Button
		classList={['hi', 'hello']} // 추가하고 싶은 class name 넘기기
		value={<ArrowForwardIosIcon>hi</ArrowForwardIosIcon>} // 버튼 안에 표시하고 싶은 요소 넘기기
		// tooltip="tooltip value" // tooltip으로 표시하고 싶은 string 넘기기
		// ttside="right" // tooltip을 표시하고 싶은 위치 넘기기 (top, right, bottom, left)
	/>
*/

type ButtonProps = {
	classList : Array<string>;
	value : any;
	tooltip? : string | undefined;
	ttside? : 'top' | 'right' | 'bottom' | 'left' | undefined;
	// undefined면 default로 bottom
}

Button.defaultProps = {
	tooltip: undefined,
	ttside: undefined
};

function Button({
	classList, value, tooltip, ttside
} : ButtonProps) {
	let clsNames = 'btn';
	const initialize = () => {
		if (classList.length === 0) {
			return;
		}
		for (let i = 0; i < Object.keys(classList).length; i += 1) {
			clsNames += ` ${classList[i]}`;
		}
		if (ttside === undefined) {
			ttside = 'bottom';
		}
	};
	initialize();
	return (
		<Grid className={clsNames}>
			{tooltip === undefined ?
				<button type="button" className="btn">{value}</button>
				:
				<Tooltip placement={ttside} title={tooltip}>
					<button type="button" className="btn">{value}</button>
				</Tooltip>}
		</Grid>
	);
}

export default Button;
