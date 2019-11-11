import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  return (
    <Header>
      <Logo>EventBooker</Logo>
      <NavItems>
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
        <li>
          <NavLink to="/bookings">Bookings</NavLink>
        </li>
      </NavItems>
    </Header>
  );
}

export default Main;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  background: #333;
  padding: 0 1rem;
  display: flex;
  align-items: center;
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
  li {
    margin-left: 1.5rem;
    a {
      text-decoration: none;
      color: #999;
      :hover,
      :active {
        color: #ddd;
        border-bottom: solid 2px #ddd;
      }
    }
  }
`;
