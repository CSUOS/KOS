import React, { useState } from 'react';
import {
	Grid, FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core';

interface indexedArray { [key: string]: boolean }
type CheckboxesProps = {
	values: indexedArray;
}

const Checkboxes = ({ values }: CheckboxesProps) => {
	const [state, setState] = useState(values);
	const handleChange = (e: any) => {
		setState({ ...state, [e.target.name]: e.target.checked });
	};

	return (
		<Grid className="checkboxes">
			<FormGroup row>
				{
					Object.keys(state).map((value) => (
						<FormControlLabel
							control={
								<Checkbox
									checked={state[value]}
									onChange={handleChange}
									name={value}
									color="primary"
								/>
							}
							label={value}
						/>
					))
				}
			</FormGroup>
		</Grid>
	);
};

export default Checkboxes;
