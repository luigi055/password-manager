import { render, screen } from "@testing-library/react";
import Wizard from "./index";
import * as tst from "./testIdentifiers";

const pageOneTestId = "page-1";
const pageTwoTestId = "page-2";
const pageThreeTestId = "page-3";

const renderWizardWithItems = (currentPage) =>
	render(
		<Wizard currentPage={currentPage}>
			<Wizard.Page>
				<h1 data-testid={pageOneTestId}>Page 1</h1>
			</Wizard.Page>
			<Wizard.Page>
				<h1 data-testid={pageTwoTestId}>Page 2</h1>
			</Wizard.Page>
			<Wizard.Page>
				<h1 data-testid={pageThreeTestId}>Page 3</h1>
			</Wizard.Page>
		</Wizard>
	);

describe("Testing Wizard component", () => {
	it("should count three info items in the header of the wizard", () => {
		renderWizardWithItems();
		const { getAllByTestId } = screen;
		const infoPages = getAllByTestId(tst.WIZARD_INFO_PAGE);

		expect(infoPages).toHaveLength(3);
		expect(infoPages[0]).toHaveTextContent(1);
		expect(infoPages[1]).toHaveTextContent(2);
		expect(infoPages[2]).toHaveTextContent(3);
	});

	it("should second page have the active class and the first one filled when the currentPage is 2", () => {
		renderWizardWithItems(2);
		const { getAllByTestId } = screen;
		const infoPages = getAllByTestId(tst.WIZARD_INFO_PAGE);

		expect(infoPages).toHaveLength(3);
		expect(infoPages[0]).toHaveClass("wizard__info-page--filled");
		expect(infoPages[1]).toHaveClass("wizard__info-page--active");
		expect(infoPages[1]).not.toHaveClass("wizard__info-page--filled");
		expect(infoPages[2]).not.toHaveClass("wizard__info-page--filled");
	});

	it("should show the check mark in all the filled items", () => {
		renderWizardWithItems(3);
		const { getAllByTestId } = screen;
		const infoPages = getAllByTestId(tst.WIZARD_INFO_PAGE);

		expect(infoPages).toHaveLength(3);
		expect(infoPages[0]).toHaveTextContent("✓");
		expect(infoPages[1]).toHaveTextContent("✓");
		expect(infoPages[2]).toHaveTextContent("3");
	});

	it("should show the active class", () => {
		renderWizardWithItems();
		const { getAllByTestId } = screen;
		const infoPages = getAllByTestId(tst.WIZARD_INFO_PAGE);

		expect(infoPages).toHaveLength(3);
		expect(infoPages[0]).toHaveTextContent(1);
		expect(infoPages[1]).toHaveTextContent(2);
		expect(infoPages[2]).toHaveTextContent(3);
	});

	it("should no show any of the pages when currentPage props is falsy", () => {
		renderWizardWithItems();
		const { queryByTestId } = screen;

		expect(queryByTestId(pageOneTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageTwoTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageThreeTestId)).not.toBeInTheDocument();
	});

	it("should only show the first page when currentPage props is 1", () => {
		renderWizardWithItems(1);
		const { queryByTestId } = screen;

		expect(queryByTestId(pageOneTestId)).toBeInTheDocument();
		expect(queryByTestId(pageTwoTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageThreeTestId)).not.toBeInTheDocument();
	});

	it("should only show the second page when currentPage props is 2", () => {
		renderWizardWithItems(2);
		const { queryByTestId } = screen;

		expect(queryByTestId(pageOneTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageTwoTestId)).toBeInTheDocument();
		expect(queryByTestId(pageThreeTestId)).not.toBeInTheDocument();
	});

	it("should only show the third page when currentPage props is 3", () => {
		renderWizardWithItems(3);
		const { queryByTestId } = screen;

		expect(queryByTestId(pageOneTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageTwoTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageThreeTestId)).toBeInTheDocument();
	});

	it("should no show any of the pages when currentPage props is bigger than amount of children", () => {
		renderWizardWithItems(4);
		const { queryByTestId } = screen;

		expect(queryByTestId(pageOneTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageTwoTestId)).not.toBeInTheDocument();
		expect(queryByTestId(pageThreeTestId)).not.toBeInTheDocument();
	});
});
