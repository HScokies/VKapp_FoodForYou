import React, { useEffect, useContext, useState } from 'react';
import './Liked';

import CardRep from '../../components/cardRep/CardRep';
import Header from '../../components/header/Header';

import { Panel, Group, Div, Text, Title} from '@vkontakte/vkui';
import API from '../../api/AxiosConfig';
import { UserId } from '../../Context';


const Recipes = ({ id, go, setActiveDish, setActivePanel }) => {
    const [likedDishes, setLikedDishes] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const userCtx = useContext(UserId);
    useEffect(()=>{
        const fetchData = async() =>{
            const response = await API.get(`/dishes/${userCtx.id}/liked`);
            console.log(userCtx.id);
            setLikedDishes(response.data);
        }
        fetchData();
    }, [trigger])
    return (
	<Panel id={id}>
        <Header>Понравилось</Header>
        <Group className='Group'>
            {
                likedDishes.length==0? "Пока здесь пусто :(" :
                likedDishes.map(dish =>(
                    <CardRep
                    key={dish.id}
                    img={dish.photoURL}
                    title={dish.name}
                    isLiked={dish.isLiked}
                    descr="placeholder"
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
)};

export default Recipes;