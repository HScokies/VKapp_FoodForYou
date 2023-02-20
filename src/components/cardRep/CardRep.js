import React, { useEffect, useState, useContext } from 'react';
import './CardRep.scss';

import { Text, Div, Title, Card } from '@vkontakte/vkui';
import { Icon28Like } from '@vkontakte/icons';
import API from '../../api/AxiosConfig';
import { ROUTES } from '../../ROUTES';
import { UserId } from '../../Context';


const CardRep = ({ trigger, triggerSet, DishID, title, descr, img, isLiked, setActivePanel, setActiveDish }) => {
    const [liked, toggleLiked] = useState(isLiked);
    const[dish, setDish] = useState([])
    const userCont = useContext(UserId);

    return (
        <Card className="card" onClick={() => { setActiveDish(DishID); }}>
            <img onClick={() => setActivePanel(ROUTES.recipe)} className="card__img" src={img} alt={title} />
            <Div className='card__text'>
                <div onClick={() => setActivePanel(ROUTES.recipe)}>
                    <Title level="2">{title}</Title>
                    <Text className="card__text_descr">
                        {descr}
                    </Text>
                </div>
                <Icon28Like className={`card__text_like ${liked ? "card__text_like-active" : null}`} onClick={async (e) => {
                    e.preventDefault();
                    const a = await API.post(`/dishes/${userCont.id}/liked/${DishID}`)
                    toggleLiked(!liked);
                    if (trigger != null) triggerSet(!trigger);
                }} />
            </Div>
        </Card>
    );
};

export default CardRep;