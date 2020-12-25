import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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
