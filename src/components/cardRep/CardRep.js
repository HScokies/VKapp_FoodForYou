import React, { useEffect, useState, useContext } from 'react';
import './CardRep.scss';

import { Text, Div, Title, Card } from '@vkontakte/vkui';
import { Icon28Like } from '@vkontakte/icons';
import API from '../../api/AxiosConfig';
import { ROUTES } from '../../ROUTES';


import { UserId } from '../../Context';


const CardRep = ({ trigger, triggerSet, DishID, setActivePanel, setActiveDish }) => {
    const [liked, toggleLiked] = useState(false);
    const[dish, setDish] = useState([]);
    const [Data, setData] = useState();
    const [products, setProducts] = useState(null);
    const userCont = useContext(UserId);
    useEffect(() =>{
        const fetchData = async() =>{
            const response = await API.get(`/dishes/get/${userCont.id}/${DishID}`);
            setData(response.data);
            setDish(Data);
            setProducts(response.data.products);
            toggleLiked(response.data.isLiked);
        }
        if (userCont != undefined && userCont != null){
            fetchData();
        }
    }, [DishID, userCont, trigger])

    return (     
        Data == undefined || Data == null? null :
        <Card className="card" onClick={() => { setActiveDish(Data.id); }}>
            <img onClick={() => setActivePanel(ROUTES.recipe)} className="card__img" src={Data.photoURL} alt={Data.name} />
            <Div className='card__text'>
                <div onClick={() => setActivePanel(ROUTES.recipe)}>
                    <Title level="2">{Data.name}</Title>
                    <Text className="card__text_descr">
                        {products == null? null : Data.products.map(p => (p == products[products.length-1]? `${p.name}.` : `${p.name}, `))}
                    </Text>
                </div>
                <Icon28Like className={`card__text_like ${liked ? "card__text_like-active" : "inactive"}`} onClick={async (e) => {
                    const a = await API.post(`/dishes/${userCont.id}/liked/${DishID}`)
                    toggleLiked(!liked);
                    if (trigger != null) triggerSet(!trigger);
                }} />
            </Div>
        </Card>
    );
};

export default CardRep;