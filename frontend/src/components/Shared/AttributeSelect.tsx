import React, {
	createRef, forwardRef, ReactFragment, useState, useEffect
} from 'react';

import { Grid, Paper } from '@material-ui/core';

import { checkIsStringEmpty, handleScrollToTop } from '../../function/FunctionManager';
import {
	SUBJECTS, DEFAULT_MENUS, CREATE_MENUS, DEFAULT_PAIRS, CREATE_PAIRS
} from '../../function/PairManager';

const nameInputRef = createRef<HTMLInputElement>();
const containerRef = createRef<HTMLDivElement>();

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

const namePlaceholder = '속성 이름';
const defaultHelperText = '기본 속성은 하나만 만들 수 있습니다';
const createHelperText = '생성 속성의 이름을 지정해주세요';

type AttributeSelectProps = {
	text: string | undefined,
	handleNameInputChange: (e: any) => void,
	handleMenuClose: () => void,
	handlePairAdd?: (pairToAdd: any) => void;
};

// TODO : PairManager 와 함께 스크립트 리팩토링하기
const AttributeSelect = forwardRef<HTMLDivElement, AttributeSelectProps>(({
	text, handleNameInputChange, handleMenuClose, handlePairAdd
}, ref) => {
	const [helperText, setHelperText] = useState('');

	// TODO : 함수 개선하기
	const onDefaultOptionClick = (e:any) => {
		const pairToAdd = DEFAULT_PAIRS[e.target.value];
		if (handlePairAdd) handlePairAdd(pairToAdd);
		handleMenuClose();
		// TODO : 현재 추가하려는 pair의 type이 이미 있는 경우
		// window의 scroll을 top으로 움직이고 helpertext를 설정한다.
		// 아니라면 pair를 추가하고 menu를 닫는다. helpertext는 초기화한다.
		// if (.includes(pairToAdd.type)) {
		//  setHelperText(defaultHelperText);
		// 	handleScrollToTop(containerRef);
		// } else {
		// if (handlePairAdd) handlePairAdd(pairToAdd);
		// handleMenuClose();
		// }
	};

	const onCreateOptionClick = (e:any) => {
		const isNameEmpty = checkIsStringEmpty(text);
		if (isNameEmpty) {
			handleScrollToTop(containerRef);
			nameInputRef.current?.focus();
			setHelperText(createHelperText);
		} else {
			const pairToAdd = CREATE_PAIRS[e.target.value];
			const newPair = { ...pairToAdd, name: text };
			if (handlePairAdd) handlePairAdd(newPair);
			setHelperText('');
			handleMenuClose();
		}
	};

	useEffect(() => {
		if (!checkIsStringEmpty(text)) setHelperText('');
	}, [text]);

	return (
		<Grid ref={ref} className="attriselect">
			<Paper className="container" elevation={5}>
				<div ref={containerRef}>
					<Part subject={SUBJECTS[0]}>
						<input
							ref={nameInputRef}
							type="text"
							className="attri-input"
							placeholder={namePlaceholder}
							onChange={handleNameInputChange}
							value={text}
						/>
						<div className="helperText">
							{helperText}
						</div>
					</Part>
					<Part subject={SUBJECTS[1]}>
						{DEFAULT_MENUS.map((menu, index) => (
							<button
								type="button"
								onClick={onDefaultOptionClick}
								value={index}
							>
								{menu}
							</button>
						))}
					</Part>
					<Part subject={SUBJECTS[2]}>
						{CREATE_MENUS.map((menu, index) => (
							<button
								type="button"
								onClick={onCreateOptionClick}
								value={index}
							>
								{menu}
							</button>
						))}
					</Part>
				</div>
			</Paper>
		</Grid>
	);
});

export default AttributeSelect;
