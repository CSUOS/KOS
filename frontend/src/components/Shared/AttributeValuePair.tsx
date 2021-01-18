import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import {
	Menu, AttributeButton as Attribute, ValueField as Value
} from '.';

type AttributeValuePairProps = {
	type?: string | undefined;
	attribute?: string | undefined;
	value?: any | undefined;
}

const AttributeValuePair = ({
	type, attribute, value
}: AttributeValuePairProps) => {
	const [open, setOpen] = useState(false);
	const [newName, setNewName] = useState('속성 이름');

	const handleInputChange = (e: any) => {
		setNewName(e.target.Value);
	};

	const handleMenuOpen = () => {
		setOpen(true);
	};

	const handleMenuClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Grid className="attributevaluepair">
				<Attribute
					type={type}
					name={attribute}
					menuOpen={open}
					handleMenuOpen={handleMenuOpen}
					handleMenuClose={handleMenuClose}
				/>
				<Value
					type={type}
					name={attribute}
					value={value}
				/>
			</Grid>
			{ open && <Menu text={newName} handleInputChange={handleInputChange} handleMenuClose={handleMenuClose} />}
		</>
	);
};

AttributeValuePair.defaultProps = {
	type: 'add-button',
	attribute: undefined,
	value: undefined,
};

export default AttributeValuePair;
