import React, { Component } from 'react';

import { Grid, Paper } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

type MenuProps = {
	contents: MenuButtonContents[];
}

type MenuButtonContents = {
	icon: JSX.Element;
	name: string;
	onClickFunc: () => void;
}

const Menu = ({ contents }: MenuProps) => (
	<Grid className="menu">
		<Paper className="container" elevation={3}>
			{
				contents.map((menubutton: MenuButtonContents) => (
					<button
						type="button"
						className="menu-button"
						onClick={menubutton.onClickFunc}
					>
						<Icon>{menubutton.icon}</Icon>
						{menubutton.name}
					</button>
				))
			}
		</Paper>
	</Grid>
);

export default Menu;
