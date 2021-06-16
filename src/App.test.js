import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import {
	INFORMATION_NEXT_BUTTON,
	INFORMATION_VIEW,
} from "./views/ProductInformation/test-identifiers";
import {
	FORM_HINT_INPUT,
	FORM_PASSWORD_INPUT,
	FORM_REPEAT_PASSWORD_INPUT,
	FORM_SUBMIT_BUTTON,
	FORM_VIEW,
} from "./views/form/test-identifiers";

import {
	FEEDBACK_CARD_SUCCESS,
	FEEDBACK_CARD_FAILURE,
} from "./views/feedback/test-identifiers";
import userEvent from "@testing-library/user-event";

jest.mock("./services/api");

describe("Testing the entire App flows", () => {
	it("should see the form page when the user is in the information page and click next", () => {
		render(<App />);

		const { getByTestId, queryByTestId } = screen;

		expect(getByTestId(INFORMATION_VIEW)).toBeInTheDocument();
		expect(queryByTestId(FORM_VIEW)).not.toBeInTheDocument();

		getByTestId(INFORMATION_NEXT_BUTTON).click();

		expect(queryByTestId(FORM_VIEW)).toBeInTheDocument();
	});

	it("should see the success view when the user enter a valid password and clicks on next button", async () => {
		render(<App />);
		const validPassword = "validPassword123";

		const { getByTestId, queryByTestId } = screen;

		getByTestId(INFORMATION_NEXT_BUTTON).click();

		userEvent.type(getByTestId(FORM_PASSWORD_INPUT), validPassword);
		userEvent.type(getByTestId(FORM_REPEAT_PASSWORD_INPUT), validPassword);

		getByTestId(FORM_SUBMIT_BUTTON).click();
		await waitFor(() =>
			expect(queryByTestId(FEEDBACK_CARD_SUCCESS)).toBeInTheDocument()
		);
	});

	it("should see the failed view when the user enter a valid password and clicks on next button but there is unauthorized status code", async () => {
		render(<App />);
		const validUnauthorizedPassword = "pruebaKO123";

		const { getByTestId, queryByTestId } = screen;

		getByTestId(INFORMATION_NEXT_BUTTON).click();

		userEvent.type(getByTestId(FORM_PASSWORD_INPUT), validUnauthorizedPassword);
		userEvent.type(
			getByTestId(FORM_REPEAT_PASSWORD_INPUT),
			validUnauthorizedPassword
		);

		getByTestId(FORM_SUBMIT_BUTTON).click();
		await waitFor(() =>
			expect(queryByTestId(FEEDBACK_CARD_FAILURE)).toBeInTheDocument()
		);
	});
});
