import React, { useContext, useEffect, useState } from 'react';
import './Recipes.scss';

import CardRep from '../../components/cardRep/CardRep';
import Header from '../../components/header/Header';
import Recipe from '../recipe/Recipe';

import { Icon24List } from '@vkontakte/icons';
import { Panel, SubnavigationButton, Group, Search, Div, Text, Title, Button} from '@vkontakte/vkui';

import API from '../../api/AxiosConfig';
import { UserId } from '../../Context';

const Recipes = ({ id, setActivePanel, openFilters, activeCategory, setActiveDish }) => {
    const [dishes, setDishes] = useState([]);
    const userCont = useContext(UserId);

    useEffect(() => {
        const fetchData = async()=>{
            let response;
            if (activeCategory != 1){
                response = (await API.get(`/dishes/get/category/${userCont.id}/${activeCategory}`)).data;
            }
            else{
                response = (await API.get(`/dishes/${userCont.id}/list`)).data
                response = response.sort((a, b) => 0.5 - Math.random())
            }
            setDishes(response)
        }
        fetchData();
    }, [activeCategory])

    const [search, setSearch] = useState('');
    useEffect(() => {
        const fetchData = async() =>{
            let response;
            if (activeCategory != 1){
                response = await API.get(`/dishes/search/${userCont.id}?CategoryID=${activeCategory}&DishName=${search}`)
            }
            else{
                response = await API.get(`/dishes/search/${userCont.id}?DishName=${search}`)
            }
            setDishes(response.data);
        }
        fetchData();
    }, [search])

    return (
	<Panel id={id}>
        <Header>Рецептики</Header>
        <Group className='Group'>
            <div className='recipes__category'>
                <Search placeholder='Поиск по рецептам...' value={search} onChange={(e) => {setSearch(e.target.value);}}/>
                <Button mode='secondary' size='m' className='recipes__button'
                    onClick={openFilters}
                    >
                    <Icon24List />
                </Button>
            </div>
            {
                dishes.map(dish =>(
                    <CardRep
                        key={dish.id}
                        setActiveDish={setActiveDish}
                        setActivePanel={setActivePanel}
                        DishID={dish.id}
                        img={dish.photoURL}
                        title={dish.name}
                        descr={dish.products.map(
                            productDat=>(
                                productDat == dish.products[dish.products.length-1] ? `${productDat.name}.` : `${productDat.name}, `
                            )
                        )}
                        isLiked={dish.isLiked}
                    />
                ))
            }
        </Group>
	</Panel>
)};

export default Recipes;