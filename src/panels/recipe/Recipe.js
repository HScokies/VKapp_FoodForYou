import React, { useEffect, useState, useContext } from 'react';
import './Recipe.scss';
import Persik from '../../img/persik.png';

import { Panel, Button, Group, Div, Text, Title, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import API from '../../api/AxiosConfig';

import { UserId } from '../../Context';

const Recipe = ({ dishID, go, id }) => {
    const [dishData, setDish] = useState(null);
    const userCont = useContext(UserId);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        // console.log('1: userID: ', usr.id, ' dishID: ', dishID);
        const fetchData = async () => {
            var res = await API.get(`/dishes/get/${userCont.id}/${dishID}`)
            setDish(res.data);
        }
        fetchData();
    }, [trigger])
    return (
        <Panel id={id}>
            {
                dishData != null ?
                    (
                        <>
                            <PanelHeader left={<PanelHeaderBack onClick={go} data-to="recipes" />} separator={false}>
                                <span className='PanelHeader'>{dishData.name}</span>
                            </PanelHeader>
                            <Group className='Group menu'>
                                <Div>
                                    <img className='menu__img' src={dishData.photoURL} alt='' />
                                    <Text className='menu__descr_img'>
                                        Время на приготовление займёт <span>{dishData.timeTotal} минут</span>
                                    </Text>
                                    <Title level='2'>
                                        Ингредиенты
                                    </Title>
                                    <Text className='menu__descr_small'>
                                        <ul>
                                            {dishData.products.map(product => (
                                                <li key={product.name}>
                                                    {product.name}
                                                    {"\t-\t"}
                                                    {product.amount} {product.unit}
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
                    (<img src={Persik} alt='' />)
            }
        </Panel>
    );
};

export default Recipe;