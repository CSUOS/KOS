import React, { forwardRef } from 'react';

import { Grid } from '@material-ui/core';

import { PageHead } from '../Sub';

type PageViewProps = {
	open : boolean;
	handleSideBarOpen : () => void;
}

const PageView = forwardRef<HTMLDivElement, PageViewProps>(({ open, handleSideBarOpen }, ref) => (
	<Grid ref={ref} className="page">
		<PageHead
			open={open}
			handleSideBarOpen={handleSideBarOpen}
		/>
	</Grid>
));

export default PageView;
