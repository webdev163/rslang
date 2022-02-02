import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinksWrapper = styled.div`
  max-width: 300px;
`;

const StyledLink = styled(Link)`
  color: palevioletred;
  text-decoration: none;
  font-size: 20px;
  display: block;
`;

const Title = styled.h1`
  color: #396bf3;
`;

const GamesPage: FC = () => {
  return (
    <div>
      <Title>Games Page</Title>
      <LinksWrapper>
        <StyledLink to="/games/audio">Мини-игра &quot;Аудиовызов&quot;</StyledLink>
        <StyledLink to="/games/sprint">Мини-игра &quot;Спринт&quot;</StyledLink>
      </LinksWrapper>
    </div>
  );
};

export default GamesPage;
