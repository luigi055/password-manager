import React, { useState } from "react";
import { Wizard } from "./components";
import Feedback from "./views/Feedback";
import CreatePasswordForm from "./views/Form";
import ProductInformation from "./views/ProductInformation";
import { submitForm } from "./services/api";
import "./App.scss";

const App = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [passwordForm, setPasswordForm] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const goToFirstStep = () => setCurrentStep(1);
	const goToSecondStep = () => setCurrentStep(2);

	return (
		<>
			<Wizard currentPage={currentStep}>
				<Wizard.Page>
					<ProductInformation onNextButtonClick={goToSecondStep} />
				</Wizard.Page>
				<Wizard.Page>
					<CreatePasswordForm
						passwordForm={passwordForm}
						setPasswordForm={setPasswordForm}
						isLoading={isLoading}
						onCancelClick={goToFirstStep}
						onNextButtonClick={async () => {
							setIsLoading(true);

							try {
								await submitForm(passwordForm.password);
								setIsSuccess(true);
							} catch (error) {
								setIsSuccess(false);
							} finally {
								setCurrentStep(3);
								setPasswordForm({});
								setIsLoading(false);
							}
						}}
					/>
				</Wizard.Page>
				<Wizard.Page>
					<Feedback
						isSuccess={isSuccess}
						onRestartButton={goToFirstStep}
						onRetryButton={goToSecondStep}
					/>
				</Wizard.Page>
			</Wizard>
		</>
	);
};

export default App;
