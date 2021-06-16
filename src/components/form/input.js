import { forwardRef, memo } from "react";
import "./input.scss";

const Field = memo(({ children, className = "", ...props }) => (
	<div className={`field ${className}`} {...props}>
		{children}
	</div>
));

const Label = memo(({ children, className = "", ...props }) => (
	<label className={`field__label ${className}`} {...props}>
		{children}
	</label>
));

const Input = memo(
	forwardRef(({ className = "", ...props }, ref) => (
		<input ref={ref} className={`field__input ${className}`} {...props} />
	))
);

Field.Label = Label;
Field.Input = Input;

export default Field;
