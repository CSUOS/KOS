import React, { ReactFragment, forwardRef } from 'react';

import { Grid } from '@material-ui/core';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { Button } from '.';

type WindowHeaderProps = {
	mainTitle: string | undefined;
	subTitle?: string | undefined;
	isTask?: true | false;
}

const WindowHeader = forwardRef<HTMLDivElement, WindowHeaderProps>(({
	mainTitle, subTitle, isTask
}, ref) => (
	<Grid ref={ref} className="windowheader">
		<Grid className="windowheader-main" container>
			<h1>{mainTitle}</h1>
			{isTask &&
				<Grid className="windowheader-task">
					<Button
						classList={['task-pin']}
						value={<RadioButtonCheckedIcon />}
						tooltip="상단에 고정시키기"
						ttside="right"
						transparent={true}
					/>
				</Grid>}
		</Grid>
		<Grid className="windowheader-sub" container>
			<p>{subTitle}</p>
		</Grid>
	</Grid>
));

WindowHeader.defaultProps = {
	subTitle: undefined,
	isTask: false,
};

export default WindowHeader;
