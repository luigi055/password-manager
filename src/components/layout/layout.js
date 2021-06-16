import "./layout.scss";

export const MainLayout = ({ className, children, ...props }) => (
	<div className={`layout__main ${className}`} {...props}>
		{children}
	</div>
);

export const Footer = ({ className, children, ...props }) => (
	<footer className={`layout__footer ${className}`}>{children}</footer>
);
