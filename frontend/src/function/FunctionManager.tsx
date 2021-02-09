import React, { RefObject } from 'react';

// TODO: 타입 명시하기
export const handleOutsideClick = (
	e: any, refObject: RefObject<HTMLElement>, callback: () => void
) => {
	if (refObject.current && !refObject.current.contains(e.target)) {
		callback();
	}
};

export const checkIsStringEmpty = (str: string | undefined | null) => {
	if (!str || !str.trim()) return true;
	return false;
};

export const handleScrollToTop = (refObject: RefObject<HTMLElement>) => {
	refObject.current?.scrollTo(0, 0);
};

export const handleScrollIntoView = (refObject: RefObject<HTMLElement>, topFocus: boolean) => {
	refObject.current?.scrollIntoView(topFocus);
};

// yyyy-mm-dd
export const getCurrentDate = () => {
	const currentDate = new Date();

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const date = currentDate.getDate();

	const yyyy = year.toString();
	const mm = month < 10 ? '0'.concat(month.toString()) : month.toString();
	const dd = date < 10 ? '0'.concat(date.toString()) : date.toString();

	return yyyy.concat('-') + mm.concat('-') + dd;
};

export const getRandomInt = (min: number, max:number) => (
	Math.floor(Math.random() * (max - min + 1)) + min);
