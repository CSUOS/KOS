import React from 'react';

import { Grid } from '@material-ui/core';

import { List, PageHeader } from '../Sub';

type PageViewProps = {
	open : boolean;
	handleSideBarOpen : () => void;
}

function PageView({ open, handleSideBarOpen } : PageViewProps) {
	return (
		<Grid className="page">
			<PageHeader
				open={open}
				handleSideBarOpen={handleSideBarOpen}
			/>
		</Grid>
	);
}

export default PageView;
