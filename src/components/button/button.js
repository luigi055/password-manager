import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./button.scss";

const generateVisualTypeClass = (visualType) =>
	visualType === "text" ? "text" : "filled";

const generateVariantClass = (variant) =>
	variant === "primary" ? "primary" : "secondary";

const Button = forwardRef(
	(
		{
			variant = "primary",
			visualType = "filled",
			children,
			className,
			...props
		},
		ref
	) => {
		return (
			<button
				className={`button ${generateVisualTypeClass(
					visualType
				)} ${generateVariantClass(variant)} ${className}`}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.propTypes = {
	variant: PropTypes.oneOf(["primary", "secondary"]),
	visualType: PropTypes.oneOf(["filled", "text"]),
};

export default Button;
