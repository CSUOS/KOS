import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

import { ReactComponent as PinIcon } from '../../images/pin.svg';

import { Button } from '.';

const TaskCardMenu = () => {
	const a = 1;
	return (
		<Grid className="taskcardmenu">
			<Paper className="container" elevation={3}>
				<button
					type="button"
					className="taskcardmenu-button"
				>
					<FileCopyIcon />
					copy
				</button>
				<button
					type="button"
					className="taskcardmenu-button"
				>
					<EditIcon />
					edit
				</button>
				<button
					type="button"
					className="taskcardmenu-button"
				>
					<DeleteIcon />
					delete
				</button>
				<button
					type="button"
					className="taskcardmenu-button"
				>
					<PinIcon />
					pin
				</button>
				<button
					type="button"
					className="taskcardmenu-button"
				>
					<ArrowRightAltIcon />
					moveTo
				</button>
				<button
					type="button"
					className="taskcardmenu-button"
				>
					<SentimentSatisfiedIcon />
					add react
				</button>
			</Paper>
		</Grid>
	);
};

export default TaskCardMenu;
