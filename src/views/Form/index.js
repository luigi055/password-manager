import React from "react";
import PropTypes from "prop-types";
import { Button, MainLayout, Footer, Field } from "../../components";
import { passwordRegExp } from "./validation";
import * as tst from "./test-identifiers";
import "./form.scss";

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
		<form
			className="form"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<MainLayout>
				<h1 data-testid={tst.FORM_TITLE}>Crea tu password Manager</h1>
				<p data-testid={tst.FORM_BODY}>
					En primer lugar, debes crear una contraseña diferente para sus
					pertenencias electronicas. No podrás recuperar tu contraseña, así que
					recuerdala bien
				</p>
				<section className="form__password-section">
					<Field>
						<Field.Label htmlFor="password">
							Crea tu contraseña maestra
						</Field.Label>

						<Field.Input
							data-testid={tst.FORM_PASSWORD_INPUT}
							id="password"
							type="password"
							placeholder="Introduce tu contraseña"
							onChange={(e) => {
								setPasswordForm({
									...passwordForm,
									password: e.target.value,
								});
							}}
							value={passwordForm.password || ""}
						/>
					</Field>
					<Field>
						<Field.Label htmlFor="validate-password">
							Repite tu contraseña maestra
						</Field.Label>
						<Field.Input
							data-testid={tst.FORM_REPEAT_PASSWORD_INPUT}
							id="validate-password"
							placeholder="Repite tu contraseña"
							type="password"
							onChange={(e) => {
								setPasswordForm({
									...passwordForm,
									repeatPassword: e.target.value,
								});
							}}
							value={passwordForm.repeatPassword || ""}
						/>
					</Field>
				</section>
				<p>
					Tambien puedes crear una pista que te ayude a recordar tu contraseña
					maestra.
				</p>
				<Field>
					<Field.Label htmlFor="hint" data-testid={tst.FORM_HINT_INFORMATION}>
						Crea tu pista para recordar tu contraseña (opcional)
					</Field.Label>
					<Field.Input
						id="hint"
						placeholder="Introduce tu pista"
						maxLength={20}
						autoComplete="off"
						data-testid={tst.FORM_HINT_INPUT}
						onChange={(e) => {
							setPasswordForm({
								...passwordForm,
								hint: e.target.value,
							});
						}}
						value={passwordForm.hint || ""}
					/>
				</Field>
			</MainLayout>
			<Footer>
				<Button
					type="button"
					visualType="text"
					variant="secondary"
					data-testid={tst.FORM_CANCEL_BUTTON}
					onClick={onCancelClick}
				>
					Cancelar
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
		</form>
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
