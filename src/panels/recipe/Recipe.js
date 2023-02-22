import React, { useEffect, useState, useContext } from 'react';


import { Panel, Button, Group, Div, Text, Title, PanelHeader, PanelHeaderBack, lastPage } from '@vkontakte/vkui';
import { Icon24ClockOutline } from '@vkontakte/icons';

import API from '../../api/AxiosConfig';
import { UserId } from '../../Context';
import { ROUTES } from "../../ROUTES";
import Placeholder from '../../img/Loading.gif';

const Recipe = ({ dishID, setActivePanel, id, toggleSnackBar, lastPage }) => {
    const [dishData, setDish] = useState(null);
    const userCont = useContext(UserId);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            var res = await API.get(`/dishes/get/${userCont.id}/${dishID}`)
            setDish(res.data);
        }
        fetchData();
    }, [userCont, trigger])

    return (
        <Panel id={id}>
            {
                dishData != null ?
                    (
                        <>
                            <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel(lastPage)} />} separator={false}>
                                <span className='PanelHeader'>{dishData.name}</span>
                            </PanelHeader>
                            <Group className='Group menu'>
                                <Div>
                                    <img className='menu__img' src={dishData.photoURL} alt='' />
                                    <div className='menu__descr_img'>
                                        <Icon24ClockOutline /> Время приготовления: <span>{dishData.timeTotal} минут</span>
                                    </div>
                                    <Title level='2'>
                                        Ингредиенты
                                    </Title>
                                    <Text className='menu__descr_small'>
                                        <ul>
                                            {dishData.products.map(product => (
                                                <li key={product.name}>
                                                    {product.name}
                                                    {"\t-\t"}
                                                    {product.amount? product.amount : null} {product.unit}
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
                                                dishData.recipe.map(step => (
                                                    <li key={Math.random()}>
                                                        {step}
                                                    </li>
                                                ))
                                            }
                                        </ol>
                                    </Text>
                                    <Text className='menu__descr_img'>
                                        {"Приятного аппетита :)"}
                                    </Text>
                                    {
                                        !dishData.isLiked?(

                                        <Button align='center'
                                            mode='secondary' size='l'
                                            stretched='true'
                                            onClick={async(e) => {
                                                e.preventDefault();
                                                const a = await API.post(`/dishes/${userCont.id}/liked/${dishID}`)
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
    )
                    :
(<img src={Placeholder} alt='' />)
            }
        </Panel >
    );
};

export default Recipe;