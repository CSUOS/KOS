import React from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

type PageViewProps = {
	open : boolean;
	handleSideBarOpen : any;
}

function PageView({ open, handleSideBarOpen } : PageViewProps) {
	return (
		<>
			<Grid className="page">
				{
					open ?
						undefined
						: <ArrowForwardIosIcon onClick={handleSideBarOpen}>click</ArrowForwardIosIcon>
				}
				<h4>{open ? '열림' : '닫힘'}</h4>
			</Grid>
		</>
	);
}

export default PageView;
