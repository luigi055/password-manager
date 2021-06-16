import React from "react";
import PropTypes from "prop-types";

import { Button, MainLayout, Footer } from "../../components";
import * as tst from "./test-identifiers";

const Feedback = ({ onRestartButton, onRetryButton, isSuccess }) =>
	isSuccess ? (
		<div data-testid={tst.FEEDBACK_CARD_SUCCESS}>
			<MainLayout>
				<h1 data-testid={tst.FEEDBACK_CARD_TITLE}>Success</h1>
				<p data-testid={tst.FEEDBACK_CARD_BODY}>something nice to say</p>
				<Footer>
					<Button
						visualType="text"
						data-testid={tst.FEEDBACK_CARD_BUTTON}
						onClick={onRestartButton}
					>
						Volver a home
					</Button>
				</Footer>
			</MainLayout>
		</div>
	) : (
		<div data-testid={tst.FEEDBACK_CARD_FAILURE}>
			<MainLayout>
				<h1 data-testid={tst.FEEDBACK_CARD_TITLE}>Failed</h1>
				<p data-testid={tst.FEEDBACK_CARD_BODY}>something bad to say</p>
				<Footer>
					<Button
						visualType="text"
						data-testid={tst.FEEDBACK_CARD_BUTTON}
						onClick={onRetryButton}
					>
						Volver a intentar
					</Button>
				</Footer>
			</MainLayout>
		</div>
	);

Feedback.propTypes = {
	isSuccess: PropTypes.bool,
	onRestartButton: PropTypes.func,
	onRetryButton: PropTypes.func,
};

export default Feedback;
