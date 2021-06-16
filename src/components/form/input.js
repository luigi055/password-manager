import { forwardRef } from "react";
import "./input.scss";

const Field = ({ children, ...props }) => (
	<div className="field" {...props}>
		{children}
	</div>
);

const Label = ({ children, className, ...props }) => (
	<label className={`field__label ${className}`} {...props}>
		{children}
	</label>
);

const Input = forwardRef(({ className, ...props }, ref) => (
	<input ref={ref} className={`field__input ${className}`} {...props} />
));

const TextArea = forwardRef(({ className, ...props }, ref) => (
	<textarea ref={ref} className={`field__input ${className}`} {...props} />
));

Field.Label = Label;
Field.Input = Input;
Field.TextArea = TextArea;

export default Field;
