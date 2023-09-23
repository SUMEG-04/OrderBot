import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/services">
            Services
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
