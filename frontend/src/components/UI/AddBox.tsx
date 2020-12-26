import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
/* ====[AddBox 사용 예시]========
mainTitle: AddBox에 표시할 설명
비고: 리스트 내부에서 사용할 '태스크 추가하기', 리스트 외부에서 사용할 '리스트 추가하기' 버튼에 해당함
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
