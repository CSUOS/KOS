import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import {
	Button, DatePicker, Select, Checkbox, Checkboxes, TextField, Menu
} from '.';

type AttributeValuePairProps = {
	type?: string | undefined;
	attribute: string;
	value?: any | undefined;
	// editable: boolean;
}

// =======[ 임시 값 ]===================
const defaultValue1 = ['김철수(ab12)', '김영희(cd34)'];
const defaultValue2 = ['진행중'];
// ======================================

const AttributeValuePair = ({
	type, attribute, value,
}: AttributeValuePairProps) => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('속성 이름');

	const handleInputChange = (e:any) => {
		setText(e.target.Value);
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
				<Grid className="attributevaluepair-attribute">
					{type === 'add-button' ? <Button classList={['']} value={attribute} onClickFun={open ? handleMenuClose : handleMenuOpen} />
						: <Button classList={['']} value={attribute} />}
				</Grid>
				<Grid className="attributevaluepair-value">
					{type === 'add-button'}
					{type === 'text-field' && <TextField value={value} />}
					{type === 'people' && <Select type={type} creatable={false} values={value} defaultValue={defaultValue1} />}
					{type === 'date-picker' && <DatePicker value={value} />}
					{(type === 'single-select' || type === 'multi-select') && <Select type={type} creatable={true} values={value} defaultValue={defaultValue2} />}
					{type === 'link'}
					{type === 'checkbox' && <Checkbox />}
					{type === 'checkboxes' && <Checkboxes values={value} />}
					{type === 'description'}
				</Grid>
			</Grid>
			{open && <Menu text={text} handleInputChange={handleInputChange} handleMenuClose={handleMenuClose} />}
		</>
	);
};

AttributeValuePair.defaultProps = {
	type: 'default',
	value: undefined,
	// editable: false,
};

export default AttributeValuePair;
