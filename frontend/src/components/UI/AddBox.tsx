import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
/* ====[AddBox 사용 예시]========
mainTitle: AddBox에 표시할 설명
================================
*/

type AddBoxProps = {
	mainTitle: string;
}

const AddBox = ({ mainTitle }: AddBoxProps) => (
	<Grid className="addbox">
		<Grid className="addbox-container" container>
			<Grid className="addbox-main" container>
				<AddIcon className="addbox-addbtn" />
				<span>{mainTitle}</span>
			</Grid>
		</Grid>
	</Grid>
);

export default AddBox;
