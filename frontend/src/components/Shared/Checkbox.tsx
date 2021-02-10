import React from 'react';

import {
	Checkbox as Check, FormControlLabel
} from '@material-ui/core';

type CheckboxProps = {
	value?: boolean | undefined;
	label?: string | undefined;
	handleValueChange: (isChecked: boolean) => void;
}
const Checkbox = ({ value, label, handleValueChange }: CheckboxProps) => (
	<FormControlLabel
		control={
			<Check
				checked={value}
				onChange={(e) => handleValueChange(e.target.checked)}
			/>
		}
		label={label}
	/>
);

Checkbox.defaultProps = {
	value: undefined,
	label: undefined,
};

export default Checkbox;
