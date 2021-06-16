import React from "react";
import { render, screen } from "@testing-library/react";
import * as tst from "./test-identifiers";
import ProductInformation from ".";

describe("Testing ProductInformation view", () => {
	it("should dispatch the onclick function passed in as prop", () => {
		const mockOnClickEvent = jest.fn();
		render(<ProductInformation onNextButtonClick={mockOnClickEvent} />);
		const { getByTestId } = screen;

		const nextButton = getByTestId(tst.INFORMATION_NEXT_BUTTON);
		nextButton.click();

		expect(mockOnClickEvent).toHaveBeenCalledTimes(1);
	});
});
