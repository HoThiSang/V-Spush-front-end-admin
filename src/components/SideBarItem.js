import React from 'react';

export  const SideBarItem = (props) => {
    const {title, sub_title:{sub1, sub2} } = props;
  return (
    <li className="menu-item">
      <a href="#!" className="menu-link menu-toggle">
        <i className="fa-solid fa-list"></i>
        <div data-i18n="Layouts">{title}</div>
      </a>
      <ul className="menu-sub">
        <li className="menu-item">
          <a href="#!" className="menu-link">
            <div data-i18n="Account">{sub1}</div>
          </a>
        </li>
      </ul>
      <ul className="menu-sub">
        <li className="menu-item">
          <a href="#!" className="menu-link">
            <div data-i18n="Account">{sub2}</div>
          </a>
        </li>
      </ul>
    </li>
  );
};


// export SideBarItem
