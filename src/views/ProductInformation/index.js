import React from "react";
import PropTypes from "prop-types";
import * as tst from "./test-identifiers";

const ProductInformation = ({ onNextButtonClick }) => (
	<div>
		<h1>page 1</h1>
		<button>Cancelar</button>
		<button
			data-testid={tst.INFORMATION_NEXT_BUTTON}
			onClick={onNextButtonClick}
		>
			go page 2
		</button>
	</div>
);

ProductInformation.propTypes = {
	onNextButtonClick: PropTypes.func,
};

export default ProductInformation;
