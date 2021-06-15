import React from "react";
import PropTypes from "prop-types";
import * as tst from "./test-identifiers";

const Feedback = ({ onRestartButton, onRetryButton, isSuccess }) =>
	isSuccess ? (
		<div data-testid={tst.FEEDBACK_CARD_SUCCESS}>
			<h1 data-testid={tst.FEEDBACK_CARD_TITLE}>Success</h1>
			<p data-testid={tst.FEEDBACK_CARD_BODY}>something nice to say</p>
			<button data-testid={tst.FEEDBACK_CARD_BUTTON} onClick={onRestartButton}>
				Volver a home
			</button>
		</div>
	) : (
		<div data-testid={tst.FEEDBACK_CARD_FAILURE}>
			<h1 data-testid={tst.FEEDBACK_CARD_TITLE}>Failed</h1>
			<p data-testid={tst.FEEDBACK_CARD_BODY}>something bad to say</p>
			<button data-testid={tst.FEEDBACK_CARD_BUTTON} onClick={onRetryButton}>
				Volver a intentar
			</button>
		</div>
	);

Feedback.propTypes = {
	isSuccess: PropTypes.bool,
	onRestartButton: PropTypes.func,
	onRetryButton: PropTypes.func,
};

export default Feedback;
