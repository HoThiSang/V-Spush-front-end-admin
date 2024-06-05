import React from 'react';

export  const SideBarItem = (props) => {
    const {title, name } = props;
  return (
    <li className="menu-item">
      <a href="#!" className="menu-link menu-toggle">
        <i className={name}></i>
        <div data-i18n="Layouts">{title}</div>
      </a>
      {/* <ul className="menu-sub">
        <li className="menu-item">
          <a href="#!" className="menu-link">
            <div data-i18n="Account">{sub1}</div>
          </a>
        </li>
      </ul> */}
      
    </li>
  );
};


// export SideBarItem
