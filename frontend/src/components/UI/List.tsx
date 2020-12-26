import React from 'react';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from './Button';
import AddBox from './AddBox';
/* ====[List 사용 예시]========
mainTitle: 리스트 이름
================================
*/

type ListProps = {
	mainTitle: string;
}

const List = ({ mainTitle }: ListProps) => (
	<Grid className="list">
		<Grid className="list-container" container>
			<Grid className="list-header" container>
				<h1 className="list-title">{mainTitle}</h1>
				<Button
					classList={['']}
					value={<MoreHorizIcon />}
					tooltip="리스트 메뉴보기"
				/>
			</Grid>
			<Grid className="list-main" container>
				<div>
					<p>Elem1</p>
					<p>Elem2</p>
					<p>Elem3</p>
				</div>
			</Grid>
			<Grid className="list-footer" container>
				<AddBox mainTitle="태스크 추가하기" />
			</Grid>
		</Grid>
	</Grid>
);

export default List;
