import React from 'react';

import { Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Button } from '../Shared';

type PageHeaderProps = {
	open : boolean;
	handleSideBarOpen : () => void;
}

const PageHeader = ({ open, handleSideBarOpen } : PageHeaderProps) => {
	const a = 1;

	return (
		<Grid className="page-header">
			<Grid className="main-header-con">
				{
					open ?
						undefined
						:
						<Button
							classList={['sidebar-btn']}
							value={<ArrowForwardIosIcon onClick={handleSideBarOpen} />}
							tooltip="Open Sidebar"
						/>
				}
			</Grid>
			<Grid className="sub-header-con">
				subheader
			</Grid>
		</Grid>
	);
};

export default PageHeader;
