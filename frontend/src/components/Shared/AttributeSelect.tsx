import React, { ReactFragment, useState } from 'react';

import { Grid, Paper } from '@material-ui/core';

type PartProps = {
	subject: string,
	children: ReactFragment,
};

const Part = ({ subject, children }: PartProps) => (
	<Grid className="part">
		<Grid className="subject">{subject}</Grid>
		<Grid className="children">{children}</Grid>
	</Grid>
);

const subjects = ['속성 이름 지정', '기본', '생성'];
const defaultMenus = ['작성자', '멤버', '생성일자', '최근 수정일자', '데드라인', '진행 상태'];
const createMenus = ['텍스트', '날짜', '단일 선택', '다중 선택', 'URL', '단일 체크박스', ' 다중 체크박스'];

type AttributeSelectProps = {
	text: string,
	handleInputChange: (e: any) => void,
	handleMenuClose: () => void,
	// onOptionClick: () => void,
};

const AttributeSelect = ({
	text, handleInputChange, handleMenuClose
}: AttributeSelectProps) => (
	<Grid className="attriselect">
		<Paper className="container" elevation={5}>
			<div>
				<Part subject={subjects[0]}>
					<input type="text" className="attri-input" onChange={handleInputChange} value={text} />
				</Part>
				<Part subject={subjects[1]}>
					{defaultMenus.map((menu) => (
						<button type="button" onClick={handleMenuClose}>{menu}</button>
					))}
				</Part>
				<Part subject={subjects[2]}>
					{createMenus.map((menu) => (
						<button type="button" onClick={handleMenuClose}>{menu}</button>
					))}
				</Part>
			</div>
		</Paper>
	</Grid>
);

export default AttributeSelect;
