import React from 'react';
import MoodIcon from '@material-ui/icons/Mood';
import PetsIcon from '@material-ui/icons/Pets';
import AppleIcon from '@material-ui/icons/Apple';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import CakeIcon from '@material-ui/icons/Cake';
import ChildCareIcon from '@material-ui/icons/ChildCare';

export const returnIcon = (text : string) => {
	let icon = <MoodIcon />;
	switch (text) {
	case 'smile':
		icon = <MoodIcon />;
		break;
	case 'pet':
		icon = <PetsIcon />;
		break;
	case 'apple':
		icon = <AppleIcon />;
		break;
	case 'audio':
		icon = <AudiotrackIcon />;
		break;
	case 'beach':
		icon = <BeachAccessIcon />;
		break;
	case 'cake':
		icon = <CakeIcon />;
		break;
	case 'child':
		icon = <ChildCareIcon />;
		break;
	default:
		icon = <MoodIcon />;
	}

	return icon;
};
