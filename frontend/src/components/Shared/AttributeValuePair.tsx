import React from 'react';
import { Grid } from '@material-ui/core';

import {
	Button, DatePicker, Tags, Select, Checkbox, Checkboxes, TextField
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

const AttributeValuePair = ({
	type, attribute, value,
}: AttributeValuePairProps) => (
	<Grid className="attributevaluepair">
		<Grid className="attributevaluepair-attribute">
			<Button classList={['']} value={attribute} />
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
);

AttributeValuePair.defaultProps = {
	type: 'default',
	value: undefined,
	// editable: false,
};

export default AttributeValuePair;
