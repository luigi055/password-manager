import React from "react";
import PropTypes from "prop-types";

import { Button, MainLayout, Footer } from "../../components";
import * as tst from "./test-identifiers";

const Feedback = ({ onNextButton, onRetryButton, isSuccess }) =>
	isSuccess ? (
		<div data-testid={tst.FEEDBACK_CARD_SUCCESS}>
			<MainLayout>
				<h1 data-testid={tst.FEEDBACK_CARD_TITLE}>
					¡Tu Password Manager ya está creado!
				</h1>
				<p data-testid={tst.FEEDBACK_CARD_BODY}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
					pharetra rhoncus justo.
				</p>
			</MainLayout>
			<Footer>
				<div />
				<Button
					visualType="text"
					data-testid={tst.FEEDBACK_CARD_BUTTON}
					onClick={onNextButton}
				>
					Acceder
				</Button>
			</Footer>
		</div>
	) : (
		<div data-testid={tst.FEEDBACK_CARD_FAILURE}>
			<MainLayout>
				<h1 data-testid={tst.FEEDBACK_CARD_TITLE}>Ha habido un error.</h1>
				<p data-testid={tst.FEEDBACK_CARD_BODY}>
					No hemos podido modificar tu Contraseña Maestra. Inténtalo más tarde.
				</p>
			</MainLayout>
			<Footer>
				<div />
				<Button
					visualType="text"
					data-testid={tst.FEEDBACK_CARD_BUTTON}
					onClick={onRetryButton}
				>
					Volver a Password Manager
				</Button>
			</Footer>
		</div>
	);

Feedback.propTypes = {
	isSuccess: PropTypes.bool,
	onNextButton: PropTypes.func,
	onRetryButton: PropTypes.func,
};

export default Feedback;
