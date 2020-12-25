import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

type AttributeValuePairProps = {
	attribute: string;
	isDefault: boolean;
	children: React.ReactFragment;
}

const AttributeValuePair = ({ isDefault, attribute, children }: AttributeValuePairProps) => (
	<Grid className="attributevaluepair">
		<Grid className="attributevaluepair-attribute">
			<Button size="small">
				{attribute}
			</Button>
		</Grid>
		<Grid className="attributevaluepair-value">{children}</Grid>
	</Grid>
);

export default AttributeValuePair;
