import React from 'react';
import {
	Grid, Checkbox as Check, FormGroup, FormControlLabel
} from '@material-ui/core';

type CheckboxProps = {
	value?: boolean | undefined;
	handleValueChange: (arg: any) => void;
}
const Checkbox = ({ value, handleValueChange }: CheckboxProps) => (
	<Grid className="checkboxs">
		<FormGroup row>
			<FormControlLabel
				control={
					<Check
						checked={value}
						onChange={(e) => handleValueChange(e.target.checked)}
					/>
				}
				label={undefined}
			/>
		</FormGroup>
	</Grid>
);

Checkbox.defaultProps = {
	value: undefined,
};

export default Checkbox;
