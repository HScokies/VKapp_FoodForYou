import React, { useContext, useEffect, useState } from 'react'
import './Home.scss';
import Header from '../../components/header/Header';
import CardRep from '../../components/cardRep/CardRep';

import ROUTES from '../../ROUTES';
import { UserId } from '../../Context';

import { Panel, Group, Div, Title, Text } from '@vkontakte/vkui';
import API from '../../api/AxiosConfig';

const Home = ({ id, setActivePanel, setActiveDish }) => {
	const userCtx = useContext(UserId);
	const [dish, setDish] = useState([]);
	const [products, setProducts] = useState(null);
	useEffect(() =>{
		const fetchData = async() =>{
			const response = (await API.get(`/dishes/${userCtx.id}/list`)).data
			const res = response[Math.floor(Math.random()*response.length)];
			setProducts(res.products);
			setDish(res);
		}
		if (userCtx != null)
			fetchData();
	}, [userCtx])
	return (
		<Panel id={id}>
			<Header>Главная</Header>
			<Group mode='card' className='Group'>
				<Title level='1' className='Group__Header'>Как насчет:</Title>
				<Div>
					<CardRep
					DishID={dish.id}
					img={dish.photoURL}
					title={dish.name}
					descr={products == null? null : products.map(p => (p == products[products.length-1]? `${p.name}.` : `${p.name}, `))}
					setActiveDish={setActiveDish}
                    setActivePanel={setActivePanel}
					/>
				</Div>
				<Div className='home__phrase'>
					<Title level='2'>
						Есть лишь одно удовольствие, превосходящее радость от вкусной еды, - это удовольствие от самого приготовления
					</Title>
					<Text className='home__phrase_descr'> &mdash; Гюнтер Грасс</Text>
				</Div>
			</Group>
		</Panel>
	)
};


export default Home;
