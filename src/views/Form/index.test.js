import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePasswordForm from ".";
import * as tst from "./test-identifiers";

const invalidPassword = "abc1A";
const validPassword = "passw0rD";

const renderCreatePasswordForm = ({
	passwordForm = {},
	setPasswordForm = () => {},
	...props
}) =>
	render(
		<CreatePasswordForm
			setPasswordForm={setPasswordForm}
			passwordForm={passwordForm}
			{...props}
		/>
	);

describe("Testing PasswordForm view", () => {
	let spySetPasswordForm;
	let spyOnNextButtonClick;
	beforeEach(() => {
		spySetPasswordForm = jest.fn();
		spyOnNextButtonClick = jest.fn();
	});

	it("should call the setPasswordForm callback when the user types in password", () => {
		renderCreatePasswordForm({ setPasswordForm: spySetPasswordForm });

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);

		userEvent.type(passwordInput, "hello");

		expect(spySetPasswordForm).toHaveBeenCalled();
	});

	it("should disable the button when the password and the repeat password inputs are empty", () => {
		renderCreatePasswordForm({});

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue("");
		expect(repeatPasswordInput).toHaveValue("");
		expect(submitButton).toBeDisabled();
	});

	it("should disable the button when the password is filled with an invalid value", () => {
		renderCreatePasswordForm({ passwordForm: { password: invalidPassword } });

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue(invalidPassword);
		expect(repeatPasswordInput).toHaveValue("");
		expect(submitButton).toBeDisabled();
	});

	it("should disable the button when the password and repeatPassword are filled with invalid values", () => {
		renderCreatePasswordForm({
			passwordForm: {
				password: invalidPassword,
				repeatPassword: invalidPassword,
			},
		});

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue(invalidPassword);
		expect(repeatPasswordInput).toHaveValue(invalidPassword);
		expect(submitButton).toBeDisabled();
	});

	it("should disable the button when the password is filled with valid but repeat is empty", () => {
		renderCreatePasswordForm({
			passwordForm: {
				password: validPassword,
			},
		});

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue(validPassword);
		expect(repeatPasswordInput).toHaveValue("");
		expect(submitButton).toBeDisabled();
	});

	it("should disable the button when the password is filled with valid but repeat is invalid", () => {
		renderCreatePasswordForm({
			passwordForm: {
				password: validPassword,
				repeatPassword: invalidPassword,
			},
		});

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue(validPassword);
		expect(repeatPasswordInput).toHaveValue(invalidPassword);
		expect(submitButton).toBeDisabled();
	});

	it("should disable the button when the repeat password is filled with a valid value but password is empty", () => {
		renderCreatePasswordForm({
			passwordForm: {
				password: "",
				repeatPassword: validPassword,
			},
		});

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue("");
		expect(repeatPasswordInput).toHaveValue(validPassword);
		expect(submitButton).toBeDisabled();
	});

	it("should disable the button when password and repeat password are filled with valid values but different", () => {
		const anotherValidPassword = "passw0rD2";
		renderCreatePasswordForm({
			passwordForm: {
				password: validPassword,
				repeatPassword: anotherValidPassword,
			},
		});

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue(validPassword);
		expect(repeatPasswordInput).toHaveValue(anotherValidPassword);
		expect(submitButton).toBeDisabled();
	});

	it("should enable the button when password and repeat password are filled with valid values and they are the same", () => {
		renderCreatePasswordForm({
			passwordForm: {
				password: validPassword,
				repeatPassword: validPassword,
			},
		});

		const { getByTestId } = screen;
		const passwordInput = getByTestId(tst.FORM_PASSWORD_INPUT);
		const repeatPasswordInput = getByTestId(tst.FORM_REPEAT_PASSWORD_INPUT);
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(passwordInput).toHaveValue(validPassword);
		expect(repeatPasswordInput).toHaveValue(validPassword);
		expect(submitButton).toBeEnabled();
	});

	it("should call the onNextButtonClick callback when button is enabled and the user clicks on it", () => {
		renderCreatePasswordForm({
			onNextButtonClick: spyOnNextButtonClick,
			passwordForm: {
				password: validPassword,
				repeatPassword: validPassword,
			},
		});

		const { getByTestId } = screen;
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);
		submitButton.click();

		expect(spyOnNextButtonClick).toHaveBeenCalledTimes(1);
	});

	it("should button has the original text when is not loading", () => {
		renderCreatePasswordForm({
			isLoading: false,
		});
		const { getByTestId } = screen;
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(submitButton).toHaveTextContent("Go to page 3");
	});

	it("should button has the loading text when is loading", () => {
		renderCreatePasswordForm({
			isLoading: true,
		});
		const { getByTestId } = screen;
		const submitButton = getByTestId(tst.FORM_SUBMIT_BUTTON);

		expect(submitButton).toHaveTextContent("Sending request...");
	});
});
