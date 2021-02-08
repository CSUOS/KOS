import React, { forwardRef, useState, Dispatch } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';

import { useProjectState, ProjectMap, usePIDDispatch } from '../Model';
import { SubMenu, SideMenu } from '../Shared';
import { InviteWindow } from './InviteWindow';

type SideProjectProps = {
	project: ProjectMap;
	pid: number;
}

const SideProject = forwardRef<HTMLDivElement, SideProjectProps>(({ project, pid }, ref) => {
	const [open, setOpen] = useState(false);
	const setPID : Dispatch<number> = usePIDDispatch();
	return (
		<Grid ref={ref} className={clsx('side-project', project[pid].BookMark && 'bookmark')}>
			<Grid className="project-info">
				<Grid className="info" onClick={() => setPID(pid)}>
					<Grid className={clsx('bg-color', project[pid].BGColor)} />
					<Grid className="project-name"><p>{project[pid].Name.length > 14 ? `${project[pid].Name.substr(0, 14)}...` : project[pid].Name}</p></Grid>
				</Grid>
				<SideMenu
					open={open}
					setOpen={setOpen}
					pid={pid}
				/>
			</Grid>
			{ open && <InviteWindow><SubMenu pid={pid} /></InviteWindow> }
		</Grid>
	);
});

export default SideProject;
