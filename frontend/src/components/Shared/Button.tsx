import React, {
	ReactElement, ReactFragment, createRef, forwardRef
} from 'react';
import { Grid, Tooltip } from '@material-ui/core';

/*
	classList : 버튼을 감싸는 div에 주고 싶은 className들
	value : 버튼 내에 표시될 요소
	tooltip : 툴팁에 표시될 내용
	ttside : 툴팁 방향
	transparent : 투명 버튼 유무
	onClickFun : 콜백 함수
*/

/*
	구조는
	<div class="btn">
		<button></button>
	</div>
	입니다.
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
				<Tooltip ref={ref} placement={ttside} title={tooltip} arrow>
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
