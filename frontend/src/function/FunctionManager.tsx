import React, { RefObject } from 'react';

export const handleOutsideClick = (
	e: any, refObject: RefObject<HTMLElement>, callback: () => void
) => {
	if (refObject.current && !refObject.current.contains(e.target)) {
		callback();
	}
};
