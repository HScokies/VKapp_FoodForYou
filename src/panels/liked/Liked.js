import React, { useEffect, useContext, useState } from 'react';
import './Liked.scss';

import CardRep from '../../components/cardRep/CardRep';
import Header from '../../components/header/Header';

import { Panel, Group, Div, Text, Title } from '@vkontakte/vkui';
import API from '../../api/AxiosConfig';
import { UserId } from '../../Context';
import Empty from '../../img/Empty.png'


const Recipes = ({ id, go, setActiveDish, setActivePanel }) => {
    const [likedDishes, setLikedDishes] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const userCtx = useContext(UserId);
    useEffect(() => {
        const fetchData = async () => {
            const response = await API.get(`/dishes/${userCtx.id}/liked`);
            setLikedDishes(response.data);
        }
        fetchData();
    }, [trigger])
    return (
        <Panel id={id}>
            <Header>Понравилось</Header>
            <Group className='Group liked'>
                {
                    likedDishes.length == 0 ?
                        <div className='liked__none'>
                            <Div className='liked__none_descr'>
                                Сохраняй рецепты с помощью 🧡 чтобы не забыть их приготовить!
                            </Div>
                            <img className='liked__none-image' src={Empty} />
                        </div>
                        :
                        likedDishes.map(dish => (
                            <CardRep
                                key={dish.id}
                                img={dish.photoURL}
                                title={dish.name}
                                isLiked={dish.isLiked}
                                descr={dish.products.map(
                                    productDat => (
                                        productDat == dish.products[dish.products.length - 1] ? `${productDat.name}.` : `${productDat.name}, `
                                    )
                                )}
                                setActiveDish={setActiveDish}
                                setActivePanel={setActivePanel}
                                DishID={dish.id}
                                UID={userCtx.id}
                                trigger={trigger}
                                triggerSet={setTrigger}
                            />
                        ))
                }
            </Group>
        </Panel>
    )
};

export default Recipes;