import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { Button } from '.';

const Chips = () => {
	const [chipData, setChipData] = useState(['우희은(hinge7)', '김정현(powergee)']);
	const handleDelete = (chipToDelete: string) => () => {
		setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
	};
	return (
		<Grid className="chips">
			{chipData.map((data) => (
				<Grid className="chip">
					{data}
					<Button classList={['']} value={<CloseSharpIcon fontSize="small" />} />
				</Grid>
			))}
		</Grid>
	);
};

export default Chips;
