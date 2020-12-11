import React from 'react';
import { Paper } from '@material-ui/core';

function KosCard(props: any) {
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

export default KosCard;
