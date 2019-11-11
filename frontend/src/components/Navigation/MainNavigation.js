import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import AuthContext from '../../context/AuthContext';

function MainNavigation() {
  const { token, logout } = useContext(AuthContext);
  return (
    <Header>
      <Logo>EventBooker</Logo>
      <NavItems>
        {!token && (
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
        {token && (
          <>
            <li>
              <NavLink to="/bookings">Bookings</NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </NavItems>
    </Header>
  );
}

export default MainNavigation;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  background: #333;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 1.5rem;
`;

const NavItems = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
  li {
    margin-left: 1.5rem;
    a,
    button {
      text-decoration: none;
      color: #999;
      border: none;
      font: inherit;
      background: transparent;
      vertical-align: middle;
      margin: 0;
      padding: 0;
      :hover,
      :active,
      &.active {
        color: #ddd;
        border-bottom: solid 2px #ddd;
      }
    }
  }
`;
