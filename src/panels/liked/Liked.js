import React from 'react';
import './Liked';

import CardRep from '../../components/cardRep/CardRep';
import Header from '../../components/header/Header';

import { Panel, Group, Div, Text, Title} from '@vkontakte/vkui';

const Recipes = ({ id, go }) => {
    return (
	<Panel id={id}>
        <Header>Понравилось</Header>
        <Group className='Group'>
            <CardRep onClick={go} dataTo="recipe"
            img='https://unsplash.com/photos/ZuIDLSz3XLg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2MDE2NzE3&force=true&w=2400' 
            title='Клёвый рецептик' 
            descr='Ингредиенты...'
            />
        </Group>
	</Panel>
)};

export default Recipes;