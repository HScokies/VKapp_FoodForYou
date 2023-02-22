import React, { useState, useContext, useEffect } from 'react';
import './Menu.scss';
import Header from '../../components/header/Header';

import { Panel, SegmentedControl, Button, Group, Card, Div, Text, Title } from '@vkontakte/vkui';
import { Icon24ClockOutline } from '@vkontakte/icons';

import API from '../../api/AxiosConfig';
import { UserId } from '../../Context';
import Placeholder from '../../img/Loading.gif';

const Menu = ({ id, toggleSnackBar }) => {
    const [menuValue, changeMenuValue] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [menuData, setMenuData] = useState(null);
    const UserData = useContext(UserId);
    useEffect(async () => {

        const response = await API.get(`/dishes/${UserData.id}/daily`)
        if (response.status == 200) {
            setMenuData(response.data);
        }
    }, [UserData, trigger])
    return (
        <Panel id={id}>
            {
                menuData == null ?
                    <img src={Placeholder} alt='loading...' /> :
                    <>
                        <Header>Меню на день</Header>
                        <Group className='Group menu'>
                            <SegmentedControl className='menu__segmented'
                                onChange={(value) => changeMenuValue(value)}
                                options={[
                                    {
                                        'label': 'Завтрак',
                                        'value': 0,
                                    },
                                    {
                                        'label': 'Обед',
                                        'value': 1,
                                    },
                                    {
                                        'label': 'Ужин',
                                        'value': 2,
                                    }
                                ]}
                            />
                            <Div>
                                <Title level='1'>
                                    {menuValue == 2 ? <span>{menuData[menuValue].name}</span>
                                        : menuValue == 1 ? <span>{menuData[menuValue].name}</span>
                                            : <span>{menuData[menuValue].name}</span>}
                                </Title>
                                <img className='menu__img' src={menuData[menuValue].photoURL} alt='' />
                                <div className='menu__descr_img'>
                                    <Icon24ClockOutline /> Время приготовления: <span>{menuData[menuValue].timeTotal} минут</span>
                                </div>
                                <Title level='2'>
                                    Ингредиенты
                                </Title>
                                <Text className='menu__descr_small'>
                                    <ul>
                                        {menuData[menuValue].products.map(product => (
                                            <li key={product.name}>
                                                {product.name}
                                                {"\t-\t"}
                                                {product.amount ? product.amount : null} {product.unit}
                                            </li>
                                        ))}
                                    </ul>
                                </Text>
                                <Title level='2'>
                                    Инструкция приготовления
                                </Title>
                                <Text className='menu__descr'>
                                    <ol>
                                        {
                                            menuData[menuValue].recipe.map(step => (
                                                <li key={Math.random()}>
                                                    {step}
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </Text>
                                <Text className='menu__descr_img'>
                                    Приятного аппетита :)
                                </Text>
                                {
                                    !menuData[menuValue].isLiked ? (

                                        <Button align='center'
                                            mode='secondary' size='l'
                                            stretched='true'
                                            onClick={async (e) => {
                                                const a = await API.post(`/dishes/${UserData.id}/liked/${menuData[menuValue].id}`)
                                                setTrigger(!trigger);
                                                toggleSnackBar();
                                            }}
                                        >
                                            Добавить в понравившиеся
                                        </Button>
                                    ) : null
                                }
                            </Div>
                        </Group>
                    </>
            }
        </Panel>
    );
};

export default Menu;