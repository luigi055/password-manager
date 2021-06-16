import React from "react";
import PropTypes from "prop-types";
import * as tst from "./testIdentifiers";
import "./wizard.scss";

const Wizard = ({ children, currentPage }) => {
	const countChildren = React.Children.count(children);
	const pagesIndex = Array.from({ length: countChildren }, (_, i) => i + 1);

	const getCurrentPageStatus = (page) => {
		let classes = "wizard__info-page";
		if (currentPage > page) {
			classes += " wizard__info-page--filled";
		} else if (currentPage === page) {
			classes += " wizard__info-page--active";
		}

		return classes;
	};

	return (
		<div className="wizard">
			<header className="wizard__header">
				<ul className="wizard__info-page__group">
					{pagesIndex.map((page) => (
						<li
							className={getCurrentPageStatus(page)}
							data-testid={tst.WIZARD_INFO_PAGE}
							id={`info-page-${page}`}
							key={page}
							aria-current={currentPage === page}
						>
							<div className="wizard__info-page__circle">
								{currentPage > page ? "✓" : page}
							</div>
							{page !== countChildren && (
								<div className="wizard__info-page__separator" />
							)}
						</li>
					))}
				</ul>
			</header>
			{children[currentPage - 1]}
		</div>
	);
};

Wizard.propTypes = {
	currentPage: PropTypes.number,
};

const Page = ({ children }) => <>{children}</>;

Wizard.Page = Page;

export default Wizard;
