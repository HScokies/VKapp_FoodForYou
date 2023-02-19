import React from 'react'
import './Home.scss';
import Header from '../../components/header/Header';
import CardRep from '../../components/cardRep/CardRep';

import { Panel, Group, Cell, Div, Avatar, Title, Text } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<Header>Главная</Header>
		<Group mode='card' className='Group'>
			<Title level='1' className='Group__Header'>Блюдо дня</Title>
			<Div>
				<CardRep onClick={go} dataTo="recipe"
				img='https://unsplash.com/photos/ZuIDLSz3XLg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2MDE2NzE3&force=true&w=2400' 
				title='Клёвый рецептик' 
				descr='Ингредиенты...' />
			</Div>
            <Div className='home__phrase'>
                <Title level='2'>
					Кулинария - это искусство, но все искусство требует знания техники и материалов.
                </Title>
				<Text className='home__phrase_descr'> &mdash; Натан Мирволд</Text>
            </Div>
		</Group>
		{/* {fetchedUser &&
		<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`UID:${fetchedUser.id} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group> */}
	</Panel>
);


export default Home;
