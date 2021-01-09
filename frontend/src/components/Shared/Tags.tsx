import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { Button } from '.';

type TagsProps = {
	value: Array<string>;
}

const Tags = ({ value }: TagsProps) => {
	const [tagData, setTagData] = useState(value);
	const handleDelete = (tagToDelete: string) => () => {
		setTagData((tags) => tags.filter((tag) => tag !== tagToDelete));
	};

	return (
		<Grid className="tags">
			{tagData.map((data) => (
				<Grid className="tag">
					{data}
					<Button
						classList={['']}
						value={<CloseSharpIcon />}
						transparent={true}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default Tags;
