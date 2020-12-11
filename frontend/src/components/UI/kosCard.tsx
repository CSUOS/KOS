import React from 'react';
import { Paper } from '@material-ui/core';

function KosCard(props) {
	return (
		<div className="kos-card-modal">
			<Paper className="kos-card-modal-content">
				<span className="close">&times;</span>
				<h1 className="kos-card-header">{props.header}</h1>
				<p className="kos-card-subheader">{props.subheader}</p>
				<section>
				</section>
			</Paper>
		</div>
	);
}

KosCard.defaultProps = {
	header: '제목',
	subheader: '부제목'
};

export default KosCard;
