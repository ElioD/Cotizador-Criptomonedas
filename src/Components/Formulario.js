import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../Hooks/useMoneda';
import useCripto from '../Hooks/useCriptomoneda';
import Error from '../Components/Error';
import Axios from 'axios';

const Boton = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	transition: background-color .3s ease;

	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
	//State
	const [ listaCripto, guardarCripto ] = useState([]);
	const [ error, guardarError ] = useState(false);

	//Monedas
	const Monedas = [
		{ codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
		{ codigo: 'MXN', nombre: 'Peso Mexicano' },
		{ codigo: 'EUR', nombre: 'EUR' },
		{ codigo: 'GBP', nombre: 'Libra Esterlina' }
	];

	//Utilizar useMoneda
	const [ moneda, Seleccionar ] = useMoneda('Elige tu moneda', '', Monedas);

	//Utilizar useCrito
	const [ criptomoneda, SelectCripto ] = useCripto('Elige tu Criptomoneda', '', listaCripto);

	//Ejecutar llamada a la API
	useEffect(() => {
		const consultarAPI = async () => {
			const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

			const resultado = await Axios.get(url);
			guardarCripto(resultado.data.Data);
		};

		consultarAPI();
	}, []);

	const cotizarMoneda = (e) => {
		e.preventDefault();

		//Validar campos
		if (moneda === '' || criptomoneda === '') {
			guardarError(true);
			return;
		}

		//Si todo sale bien
		guardarError(false);
		guardarMoneda(moneda);
		guardarCriptomoneda(criptomoneda);
	};

	return (
		<form onSubmit={cotizarMoneda}>
			{error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
			<Seleccionar />
			<SelectCripto />
			<Boton type="submit" value="Calcular" />
		</form>
	);
};

export default Formulario;
