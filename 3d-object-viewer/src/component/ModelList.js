import React from "react";
import { Link } from "react-router-dom";

const ModelList = ({ models }) => {
	return (
		<div>
			<h2>Geüploade Modellen</h2>
			<ul>
				{models.map((model, index) => (
					<li key={index}>
						<Link to={`/model/${model}`}>{model}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ModelList;
