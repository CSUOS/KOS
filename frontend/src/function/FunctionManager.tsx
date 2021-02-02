import React, { RefObject, ForwardedRef } from 'react';

export const handleOutsideClick = (
	e: any, refObject: RefObject<HTMLElement>, callback: () => void
) => {
	if (refObject.current && !refObject.current.contains(e.target)) {
		callback();
	}
};

export const checkIsStringEmpty = (str:string | undefined | null) => {
	if (!str || !str.trim()) return true;
	return false;
};

export const handleScrollToTop = (refObject: RefObject<HTMLElement>) => {
	refObject.current?.scrollTo(0, 0);
};

export const handleScrollIntoView = (refObject: RefObject<HTMLElement>, topFocus : boolean) => {
	refObject.current?.scrollIntoView(topFocus);
};
