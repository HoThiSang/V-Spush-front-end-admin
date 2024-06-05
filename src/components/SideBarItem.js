import React from 'react';
import { Link } from 'react-router-dom';

export  const SideBarItem = (props) => {
    const {title, name , link} = props;
  return (
    <li className="menu-item ">
      <Link to={`/${link}`} className="menu-link menu-toggle">
        <i className={name}  style={{ fontSize: '1.2em', marginRight: '10px' }} ></i>
        <div data-i18n="Layouts">{title}</div>
      </Link>
     
      
    </li>
  );
};

