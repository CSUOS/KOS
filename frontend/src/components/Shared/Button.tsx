import React, {
	ReactElement, ReactFragment, createRef, forwardRef
} from 'react';
import { Grid, Tooltip } from '@material-ui/core';

/*
	사용예시
	<Button
		classList={['hi', 'hello']} // 추가하고 싶은 class name 넘기기
		value={<ArrowForwardIosIcon>hi</ArrowForwardIosIcon>} // 버튼 안에 표시하고 싶은 요소 넘기기
		// tooltip="tooltip value" // tooltip으로 표시하고 싶은 string 넘기기
		// ttside="right" // tooltip을 표시하고 싶은 위치 넘기기 (top, right, bottom, left)
		// transparent="true" // 배경, hover 효과 없애고 싶을 때 true로 지정
	/>
*/

const tooltipRef = createRef();

type ButtonProps = {
	classList : Array<string>;
	value : string | ReactElement | ReactFragment;
	tooltip? : string | undefined;
	ttside? : 'top' | 'right' | 'bottom' | 'left' | undefined;
	// undefined면 default로 bottom
	transparent? : boolean;
	onClickFun? : () => void;
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(({
	classList, value, tooltip, ttside, transparent, onClickFun
}, ref) => {
	let clsNames = 'btn';
	const initialize = () => {
		if (classList.length !== 0) {
			for (let i = 0; i < Object.keys(classList).length; i += 1) {
				clsNames += ` ${classList[i]}`;
			}
		}
		if (ttside === undefined) { // undefined면 default로 bottom
			ttside = 'bottom';
		}
		if (transparent === true) { // trans btn 적용
			clsNames += ' trans';
		}
	};
	initialize();
	return (
		<Grid className={clsNames}>
			{tooltip === undefined ?
				<button type="button" onClick={onClickFun}>{value}</button>
				:
				<Tooltip ref={ref} placement={ttside} title={tooltip}>
					<button type="button" onClick={onClickFun}>{value}</button>
				</Tooltip>}
		</Grid>
	);
});

Button.defaultProps = {
	tooltip: undefined,
	ttside: undefined,
};

export default Button;
