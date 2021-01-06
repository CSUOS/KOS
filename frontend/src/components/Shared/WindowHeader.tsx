import React, { ReactElement, ReactFragment } from 'react';
import { Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { Button } from '.';

/* ====[WindowHeader 사용 예시]========
mainTitle: 페이지 이름
subTitle: 페이지에 대한 설명. 선택사항.
hasCloseButton: window가 close button을 가졌는지 여부
option: subTitle과 같은 줄에 들어갈 기타 element. 선택사항.
================================
*/
type WindowHeaderProps = {
	mainTitle: string;
	subTitle?: string | undefined;
	isTask?: true | false;
}

const WindowHeader = ({
	mainTitle, subTitle, isTask
}: WindowHeaderProps) => (
	<Grid className="windowheader">
		<Grid className="windowheader-main" container>
			<Grid>
				<h1>{mainTitle}</h1>
				{isTask && <Button classList={['task-pin']} value={<StarIcon />} />}
			</Grid>
		</Grid>
		<Grid className="windowheader-sub" container>
			<p>{subTitle}</p>
		</Grid>
	</Grid>
);

WindowHeader.defaultProps = {
	subTitle: undefined,
	isTask: false,
};

export default WindowHeader;
