import React, { useContext, useEffect, useState } from 'react';
import './Recipes.scss';

import CardRep from '../../components/cardRep/CardRep';
import Header from '../../components/header/Header';
import Recipe from '../recipe/Recipe';

import { Icon24List } from '@vkontakte/icons';
import { Panel, SubnavigationButton, Group, Search, Div, Text, Title, Button } from '@vkontakte/vkui';

import API from '../../api/AxiosConfig';
import { UserId } from '../../Context';
import Placeholder from '../../img/Loading.gif';
import NotFound from '../../img/NotFound.gif';

const Recipes = ({ id, setActivePanel, openFilters, activeCategory, setActiveDish, setRandDishes, randDishes }) => {
    const [dishes, setDishes] = useState(null);
    const userCont = useContext(UserId);
    const [search, setSearch] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            let response;
            if (activeCategory != 1) {
                response = (await API.get(`/dishes/get/category/${userCont.id}/${activeCategory}`)).data;
            }
            else if (randDishes != null) {
                response = randDishes;
            }
            else {
                if (randDishes == null) {
                    response = (await API.get(`/dishes/${userCont.id}/list`)).data;
                    response = response.sort(() => Math.random() - 0.5);
                    setRandDishes(response);
                }
            }
            setDishes(response)
        }

        fetchData();
    }, [activeCategory, userCont])

    useEffect(() => {
        const fetchData = async () => {
            let response = null;
            if (activeCategory != 1) {
                response = await API.get(`/dishes/search/${userCont.id}?CategoryID=${activeCategory}&DishName=${search}`)
                setDishes(response.data);
            }
            else {
                if (search.length > 0)
                    response = await API.get(`/dishes/search/${userCont.id}?DishName=${search}`)
                response != null ? setDishes(response.data) : setDishes(randDishes);
            }
        }
        fetchData();
    }, [search])

    const [trigger, setTrigger] = useState(false);
    return (
        <Panel id={id}>
            <Header left={null}>Рецептики</Header>
            {
                dishes == null ?
                    <img src={Placeholder} alt='Loading...' /> :
                    <>
                        <Group className='Group'>
                            <div className='recipes__category'>
                                <Search placeholder='Поиск по рецептам...' value={search} onChange={(e) => { setSearch(e.target.value); }} after={null} />
                                <Button mode='secondary' size='m' className='recipes__button'
                                    onClick={openFilters}
                                >
                                    <Icon24List />
                                </Button>
                            </div>
                            {
                                (dishes.length == 0) ?
                                    <img alt='NotFound' className='NotFound' src={NotFound} /> :
                                    dishes.map(dish => (
                                        <CardRep
                                            key={dish.id}
                                            setActiveDish={setActiveDish}
                                            setActivePanel={setActivePanel}
                                            DishID={dish.id}
                                            trigger={trigger}
                                            triggerSet={setTrigger}
                                        />
                                    ))
                            }
                        </Group>
                    </>
            }

        </Panel>
    )
};

export default Recipes;