import React, { FC } from 'react';
import NavMenu from '../NavMenu';
import styled from 'styled-components';

const Title = styled.h1`
  color: #396bf3;
`;

const GameSprint: FC = () => {
  return (
    <div>
      <NavMenu />
      <Title>Sprint Game</Title>
    </div>
  );
};

export default GameSprint;
