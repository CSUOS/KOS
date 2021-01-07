import React, { forwardRef } from 'react';

import { Grid } from '@material-ui/core';

import { ProjectHead } from '../Sub';
import { ProjectObj } from '../Model';

type PageViewProps = {
	open : boolean;
	handleSideBarOpen : () => void;
	project : Array<ProjectObj> | undefined;
}

const PageView = forwardRef<HTMLDivElement, PageViewProps>(({ open, handleSideBarOpen, project }, ref) => (
	<Grid ref={ref} className="page">
		<ProjectHead
			open={open}
			handleSideBarOpen={handleSideBarOpen}
		/>
	</Grid>
));

export default PageView;
