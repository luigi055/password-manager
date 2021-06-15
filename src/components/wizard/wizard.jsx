import React from "react";
import "./wizard.scss";

const Wizard = ({ children, currentPage }) => {
	const countChildren = React.Children.count(children);
	const pagesIndex = Array.from({ length: countChildren }, (_, i) => i + 1);

	return (
		<div>
			<header>
				{pagesIndex.map((page) => (
					<span
						className={
							currentPage === page ? "wizard_info-page--active" : undefined
						}
						id={`info-page-${page}`}
						key={page}
					>
						{page}
					</span>
				))}
			</header>
			{children[currentPage - 1]}
		</div>
	);
};

const Page = ({ children }) => <div>{children}</div>;

Wizard.Page = Page;

export default Wizard;
