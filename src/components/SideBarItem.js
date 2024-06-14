import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const SideBarItem = (props) => {
  const { title, name, link } = props;
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setIsActive(true);
  };

  React.useEffect(() => {
    setIsActive(location.pathname === `/${link}`);
  }, [location.pathname, link]);

  return (
    <li
      className={`menu-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      style={{
        backgroundColor: isActive ? '#0d6efd' : 'transparent',
        color: isActive ? '#fff' : 'red',
      }}
    >
      <Link to={`/${link}`} className="menu-link menu-toggle" style={{
        color: isActive ? '#fff' : '#6e6b7b',
      }}>
        <i className={name} style={{ fontSize: '1.2em', marginRight: '10px', color: isActive ? '#fff' : '#6e6b7b' }} ></i>
        <div data-i18n="Layouts" style={{
          color: isActive ? '#fff' : '#6e6b7b',
        }}>{title}</div>
      </Link>
    </li>
  );
};