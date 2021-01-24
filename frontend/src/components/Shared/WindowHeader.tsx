import React from 'react';

import { Grid } from '@material-ui/core';

type WindowHeaderProps = {
	mainTitle: string | undefined;
	subTitle?: string | undefined;
}

const WindowHeader = ({ mainTitle, subTitle }: WindowHeaderProps) => (
	<Grid className="windowheader">
		<Grid className="windowheader-main" container>
			<h1>{mainTitle}</h1>
		</Grid>
		<Grid className="windowheader-sub" container>
			<p>{subTitle}</p>
		</Grid>
	</Grid>
);

WindowHeader.defaultProps = {
	subTitle: undefined
};

export default WindowHeader;
