import React from 'react';
import './Recipe.scss';

import Header from '../../components/header/Header';

import { Panel, Button, Group, Div, Text, Title} from '@vkontakte/vkui';

const Recipe = ({ id, title, preparation, ingredients, time }) => {
    return (
	<Panel id={id}>
        <Header>{title}</Header>
        <Group className='recipe'>
            <Div>
                <img className='menu__img' src='https://unsplash.com/photos/ZuIDLSz3XLg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2MDE2NzE3&force=true&w=2400' alt='' />
                <Text className='menu__descr_img'>
                    {time}
                </Text>
                <Title level='2'>
                    Ингредиенты
                </Title>
                <Text className='menu__descr_small'>
                    {ingredients}
                </Text>
                <Title level='2'>
                    Инструкция приготовления
                </Title>
                <Text className='menu__descr'>
                    {preparation}
                </Text>
                <Text className='menu__descr_img'>
                    Приятного аппетита :)
                </Text>
                <Button align='center'
                mode='secondary' size='l'
                stretched='true'
                >
                Добавить в понравившиеся
              </Button>
            </Div>
        </Group>
	</Panel>
    );
};

export default Recipe;