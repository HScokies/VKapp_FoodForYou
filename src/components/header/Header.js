import React from 'react';
import "./Header.scss";
import { PanelHeader } from '@vkontakte/vkui';

const Header = ({ children }) => {
    return (
      <PanelHeader separator={false}><span className='PanelHeader'>{children}</span></PanelHeader>
    );
};

export default Header;