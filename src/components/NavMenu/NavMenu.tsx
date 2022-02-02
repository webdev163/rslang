import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  max-width: 550px;
`;

const NavList = styled.ul`
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavItem = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  color: palevioletred;
  text-decoration: none;
  font-size: 20px;
`;

const NavMenu: FC = () => {
  return (
    <NavWrapper>
      <NavList>
        <NavItem>
          <StyledLink to="/">Главная</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/login">Войти</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/guide">Учебник</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/games">Мини-игры</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/stats">Статистика</StyledLink>
        </NavItem>
      </NavList>
    </NavWrapper>
  );
};

export default NavMenu;
