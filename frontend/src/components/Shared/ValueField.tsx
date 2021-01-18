import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import {
	Button, DatePicker, Select, Checkbox, Checkboxes, TextField
} from '.';

type ValueFieldProps = {
	type?: string | undefined;
	name?: string | undefined;
	value?: any | undefined;
}

const ValueField = ({ type, name, value } : ValueFieldProps) => {
	// =======[ 임시 값 ]===================
	const defaultValue1 = ['김철수(ab12)', '김영희(cd34)'];
	const defaultValue2 = ['진행중'];
	// ======================================

	return (
		<Grid className="valuefield">
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
	);
};

ValueField.defaultProps = {
	type: 'add-button',
	name: undefined,
	value: undefined,
};

export default ValueField;
