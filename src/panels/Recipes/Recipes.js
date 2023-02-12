import React from 'react';
import './Recipes.scss';

import CardRep from '../../components/cardRep/CardRep';
import Header from '../../components/header/Header';

import { Icon24List } from '@vkontakte/icons';
import { Panel, SubnavigationButton, Group, Div, Text, Title} from '@vkontakte/vkui';

const Recipes = ({ id }) => {


    const Recipe = () => {
        
    }


    return (
	<Panel id={id}>
        <Header>Рецептики</Header>
        <Group className='Group'>
            <div className='recipes__button'>
                <SubnavigationButton size='l'
                    before={<Icon24List />}
                    onClick={() => console.log('clickMd')}
                    >
                    Все категории
                </SubnavigationButton>
            </div>
            <CardRep 
            img='https://unsplash.com/photos/ZuIDLSz3XLg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2MDE2NzE3&force=true&w=2400' 
            title='Клёвый рецептик' 
            descr='Ингредиенты...' 
            />
        </Group>
	</Panel>
)};

export default Recipes;