import React, { createRef, forwardRef } from 'react';

import { Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Button } from '../Shared';

const buttonRef = createRef<HTMLDivElement>();

type PageHeadProps = {
	open : boolean;
	handleSideBarOpen : () => void;
}

const PageHead = forwardRef<HTMLDivElement, PageHeadProps>(({
	open, handleSideBarOpen
}, ref) => {
	const a = 1;

	return (
		<Grid ref={ref} className="page-header">
			<Grid className="main-header-con">
				{
					open ?
						undefined
						:
						<Button
							classList={['sidebar-btn']}
							value={<ArrowForwardIosIcon onClick={handleSideBarOpen} />}
							tooltip="Open Sidebar"
							ref={buttonRef}
						/>
				}
			</Grid>
			<Grid className="sub-header-con">
				subheader
			</Grid>
		</Grid>
	);
});

export default PageHead;
