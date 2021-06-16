import React from "react";
import PropTypes from "prop-types";
import { Button, MainLayout, Footer } from "../../components";
import * as tst from "./test-identifiers";
import "./product-information.scss";

const ProductInformation = ({ onNextButtonClick }) => (
	<main>
		<MainLayout>
			<h1>Crea tu password Manager</h1>

			<section className="product-information__about">
				<div className="product-information__about__column">
					<div className="product-information__about__image-wrapper">
						<img
							src="assets/img/group.svg"
							alt="it is tricky to remember all your passwords"
						/>
					</div>
					<p>
						Guarda aquí todas tus contraseñas, datos o cualquier información,
						olvida las notas de papel y las aplicaciones no protegidas
					</p>
				</div>
				<div className="product-information__about__column">
					<div className="product-information__about__image-wrapper">
						<img
							src="assets/img/group-3.svg"
							alt="it is tricky to remember all your passwords"
						/>
					</div>
					<p>
						Crea tu clave maestra. Solo tu podrás acceder a tus secretos con
						ellos.
					</p>
				</div>
			</section>

			<h2>Como funciona</h2>
			<p>
				En primer lugar, debes crear una contraseña diferente para sus
				pertenencias electronicas. No podrás recuperar tu contraseña, así que
				recuerdala bien
			</p>

			<h2>Que datos puedes guardar?</h2>
			<p>
				Por ejemplo, el número de tu tarjeta. El PIN y el PUK de tu teléfono
				móvil. el número de serie de alguno de tus dispositivos o cualquier
				información que necesites tener en un lugar seguro.
			</p>
		</MainLayout>
		<Footer>
			<Button visualType="text" variant="secondary">
				Cancelar
			</Button>
			<Button
				variant="secondary"
				data-testid={tst.INFORMATION_NEXT_BUTTON}
				onClick={onNextButtonClick}
			>
				Siguiente
			</Button>
		</Footer>
	</main>
);

ProductInformation.propTypes = {
	onNextButtonClick: PropTypes.func,
};

export default ProductInformation;
