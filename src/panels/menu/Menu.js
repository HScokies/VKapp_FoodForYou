import React, { useState } from 'react';
import './Menu.scss';

import Header from '../../components/header/Header';

import { Panel, SegmentedControl, Button, Group, Card, Div, Text, Title} from '@vkontakte/vkui';

const Menu = ({ id }) => {
    const [menuValue, changeMenuValue] = useState();

    return (
    <Panel id={id}>
        <Header>Меню на день</Header>
        <Group className='Group'> 
            <SegmentedControl className='menu__segmented'
            onChange={(value) => changeMenuValue(value)}
            options={[
                {
                'label': 'Завтрак',
                'value': 'breakfast',
                },
                {
                'label': 'Обед',
                'value': 'lunch',
                },
                {
                'label': 'Ужин',
                'value': 'dinner',
                }
            ]}
            />
            <Div>
                <Title level='1'>
                    {menuValue == 'dinner' ? <span>{'Ужин'}</span> 
                    : menuValue == 'lunch' ? <span>{'Обед'}</span> 
                    : <span>{'Завтрак'}</span>} для ленивых
                </Title>
                <img className='menu__img' src='https://unsplash.com/photos/ZuIDLSz3XLg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2MDE2NzE3&force=true&w=2400' alt='' />
                <Text className='menu__descr_img'>
                    Время на приготовление займёт 15 минут
                </Text>
                <Title level='2'>
                    Ингредиенты
                </Title>
                <Text className='menu__descr_small'>
                    Куриное яйцо  - 1 штука <br/>
                    Мягкий творог - 200 грамм <br/>
                    Пшеничная мука - 30 грамм <br/>
                </Text>
                <Title level='2'>
                    Инструкция приготовления
                </Title>
                <Text className='menu__descr'>
                    1. В широкую миску выложить творог, добавить яйцо, сахар и муку и вилкой смешать до однородной консистенции. Если масса получилась слишком липкой, добавить еще муки, но не больше половины столовой ложки.
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

export default Menu;