import React from 'react';
import './Recipes.scss';
import { Icon12Add } from '@vkontakte/icons';

import { Panel, PanelHeader, Header, Button, Group, Card, Div, CardGrid, Text, Title} from '@vkontakte/vkui';

const Recipes = ({ id }) => (
	<Panel id={id}>
		<PanelHeader><span className='PanelHeader'>Главная</span></PanelHeader>
        <Group>
            <Card mode="shadow" className="recipes__card">
                <img className="recipes__card_img" src="https://unsplash.com/photos/ZuIDLSz3XLg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2MDE2NzE3&force=true&w=2400" alt="" />
                <Div>
                    <Title level="1">Клёвый рецептик⁣</Title>
                    <Text className="recipes__card_descr">Ингредиенты....</Text>
                </Div>
            </Card>
        </Group>
	</Panel>
);

export default Recipes;