import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import { ProjectObj } from '../Model';
import { SubMenu, SideMenu } from '../Shared';

type SideProjectProps = {
	project : ProjectObj;
}

const SideProject = forwardRef<HTMLDivElement, SideProjectProps>(({
	project
}, ref) => {
	const [open, setOpen] = useState(false);

	return (
		<Grid ref={ref} className="side-project">
			<Grid className="project-info">
				<Grid className="info">
					<Grid className={clsx('bg-color', project.bgColor)}> </Grid>
					<Grid className="project-name"><p>{project.name.length > 14 ? `${project.name.substr(0, 14)}...` : project.name}</p></Grid>
				</Grid>
				<SideMenu
					open={open}
					setOpen={setOpen}
					project={project}
				/>
			</Grid>
			{ open ?
				<SubMenu />
				: undefined }
		</Grid>
	);
});

export default SideProject;
