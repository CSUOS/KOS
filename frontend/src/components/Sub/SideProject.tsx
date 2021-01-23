import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import { useProjectState, ProjectObj } from '../Model';
import { SubMenu, SideMenu } from '../Shared';

type SideProjectProps = {
	pid: number;
}

const SideProject = forwardRef<HTMLDivElement, SideProjectProps>(({ pid }, ref) => {
	const [open, setOpen] = useState(false);
	const project : ProjectObj | undefined = useProjectState();

	return (
		<Grid ref={ref} className="side-project">
			{
				project &&
				<Grid className="project-info">
					<Grid className="info">
						<Grid className={clsx('bg-color', project[pid].bgColor)}> </Grid>
						<Grid className="project-name"><p>{project[pid].name.length > 14 ? `${project[pid].name.substr(0, 14)}...` : project[pid].name}</p></Grid>
					</Grid>
					<SideMenu
						open={open}
						setOpen={setOpen}
						pid={pid}
					/>
				</Grid>
			}
			{ open && <SubMenu /> }
		</Grid>
	);
});

export default SideProject;
