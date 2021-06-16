import { render, screen } from "@testing-library/react";

import * as tst from "./test-identifiers";
import Feedback from ".";

const renderFeedBack = ({ ...props }) => render(<Feedback {...props} />);

describe("Testing Feedback view", () => {
	let spyOnRetryButton = jest.fn();
	let spyOnRestartButton = jest.fn();

	it("should show the success feedback card when isSuccess prop is true", () => {
		renderFeedBack({ isSuccess: true });

		const { queryByTestId, getByTestId } = screen;

		expect(getByTestId(tst.FEEDBACK_CARD_SUCCESS)).toBeInTheDocument();
		expect(queryByTestId(tst.FEEDBACK_CARD_FAILURE)).not.toBeInTheDocument();
	});

	it("should show the failure feedback card when isSuccess prop is false", () => {
		renderFeedBack({ isSuccess: false });

		const { queryByTestId, getByTestId } = screen;

		expect(getByTestId(tst.FEEDBACK_CARD_FAILURE)).toBeInTheDocument();
		expect(queryByTestId(tst.FEEDBACK_CARD_SUCCESS)).not.toBeInTheDocument();
	});

	describe("Testing Failure component", () => {
		beforeEach(() => {
			renderFeedBack({
				isSuccess: false,
				onRetryButton: spyOnRetryButton,
				onNextButton: spyOnRestartButton,
			});
		});

		it("should call onRetryButton when the user clicks on retry button", () => {
			const { getByTestId } = screen;

			const cardButton = getByTestId(tst.FEEDBACK_CARD_BUTTON);
			cardButton.click();

			expect(spyOnRetryButton).toHaveBeenCalledTimes(1);
			expect(spyOnRestartButton).not.toHaveBeenCalled();
		});
	});

	describe("Testing success component", () => {
		beforeEach(() => {
			renderFeedBack({
				isSuccess: true,
				onRetryButton: spyOnRetryButton,
				onNextButton: spyOnRestartButton,
			});
		});

		it("should call onNextButton when the user clicks on restart button", () => {
			const { getByTestId } = screen;

			const cardButton = getByTestId(tst.FEEDBACK_CARD_BUTTON);
			cardButton.click();

			expect(spyOnRetryButton).not.toHaveBeenCalled();
			expect(spyOnRestartButton).toHaveBeenCalledTimes(1);
		});
	});
});
