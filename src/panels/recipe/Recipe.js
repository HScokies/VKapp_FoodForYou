import React from 'react';
import './Recipe.scss';

import { Panel, Button, Group, Div, Text, Title, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

const Recipe = ({ id, title, preparation, ingredients, time, go }) => {
    return (
	<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to="recipes"/>} separator={false}><span className='PanelHeader'>{title}</span></PanelHeader>
        <Group className='Group menu'>
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