import React from "react";
import PropTypes from "prop-types";
import { Button, MainLayout, Footer } from "../../components";
import { passwordRegExp } from "./validation";
import * as tst from "./test-identifiers";

const CreatePasswordForm = ({
	passwordForm,
	setPasswordForm,
	onNextButtonClick,
	onCancelClick,
	isLoading,
}) => {
	const isPasswordValid = passwordRegExp.test(passwordForm.password || "");

	const isPasswordVerificationValid =
		passwordForm.password &&
		passwordForm.repeatPassword &&
		passwordForm.password === passwordForm.repeatPassword;

	return (
		<main>
			<MainLayout>
				<h1 data-testid={tst.FORM_TITLE}>page 2</h1>
				<p data-testid={tst.FORM_BODY}>
					elmfelfmelfmelm emfelfmel mfle mflmelfm{" "}
				</p>
				<input
					data-testid={tst.FORM_PASSWORD_INPUT}
					id="password"
					type="password"
					onChange={(e) => {
						setPasswordForm({
							...passwordForm,
							password: e.target.value,
						});
					}}
					value={passwordForm.password || ""}
				/>
				<input
					data-testid={tst.FORM_REPEAT_PASSWORD_INPUT}
					id="validate-password"
					type="password"
					onChange={(e) => {
						setPasswordForm({
							...passwordForm,
							repeatPassword: e.target.value,
						});
					}}
					value={passwordForm.repeatPassword || ""}
				/>
				<p data-testid={tst.FORM_HINT_INFORMATION}>
					elmfelfmelfmelm emfelfmel mfle mflmelfm{" "}
				</p>
				<textarea
					data-testid={tst.FORM_HINT_INPUT}
					onChange={(e) => {
						setPasswordForm({
							...passwordForm,
							hint: e.target.value,
						});
					}}
					value={passwordForm.hint || ""}
				/>
			</MainLayout>
			<Footer>
				<Button
					visualType="text"
					variant="secondary"
					data-testid={tst.FORM_CANCEL_BUTTON}
					onClick={onCancelClick}
				>
					cancelar
				</Button>
				<Button
					variant="secondary"
					data-testid={tst.FORM_SUBMIT_BUTTON}
					disabled={!isPasswordValid || !isPasswordVerificationValid}
					onClick={onNextButtonClick}
				>
					{isLoading ? "Sending request..." : "Go to page 3"}
				</Button>
			</Footer>
		</main>
	);
};

CreatePasswordForm.propTypes = {
	setPasswordForm: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	onNextButtonClick: PropTypes.func,
	onCancelClick: PropTypes.func,
	passwordForm: PropTypes.shape({
		password: PropTypes.string,
		repeatPassword: PropTypes.string,
		hint: PropTypes.string,
	}),
};

export default CreatePasswordForm;
