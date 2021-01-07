import React, { createRef, forwardRef } from 'react';

import { Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Button } from '../Shared';

const buttonRef = createRef<HTMLDivElement>();

type ProjectHeadProps = {
	open : boolean;
	handleSideBarOpen : () => void;
}

const ProjectHead = forwardRef<HTMLDivElement, ProjectHeadProps>(({
	open, handleSideBarOpen
}, ref) => {
	const a = 1;

	return (
		<Grid ref={ref} className="project-header">
			<Grid className="main-head-con">
				{
					open ?
						undefined
						:
						<Button
							classList={['sidebar-btn']}
							value={<ArrowForwardIosIcon onClick={handleSideBarOpen} />}
							tooltip="Open Sidebar"
							transparent={true}
							ref={buttonRef}
						/>
				}
			</Grid>
			<Grid className="sub-head-con">
				subheader
			</Grid>
		</Grid>
	);
});

export default ProjectHead;
