import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Title, Card, CardGrid } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader separator={false}><span className='PanelHeader'>Главная</span></PanelHeader>
		<Group mode='card' className='Group'>
			<Title level='1' className='Group__Header'>Блюдо дня</Title>
			<Div>
				<Card mode='shadow' className='Group__Card'>
					<img src='https://unsplash.com/photos/ZuIDLSz3XLg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2MDE2NzE3&force=true&w=2400' />
					<Title level='2'>
						Название рецепта
					</Title>
				</Card>
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

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
