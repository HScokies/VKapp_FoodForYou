import React from 'react';
import './CardRep.scss';

import { Text,Div, Title, Card} from '@vkontakte/vkui';
import { Icon28Like } from '@vkontakte/icons';

const CardRep = ({ title, descr, img, onClick }) => {
    return (
        <Card className="card" onClick={onClick}>
            <img className="card__img" src={img} alt="" />
            <Div className='card__text'>
                <div>
                    <Title level="2">{title}</Title>
                    <Text className="card__text_descr">{descr}</Text>
                </div>
                <Icon28Like className='card__text_like' />
            </Div>
        </Card>
    );
};

export default CardRep;