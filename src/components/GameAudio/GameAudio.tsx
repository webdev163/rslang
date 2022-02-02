import React, { FC } from 'react';
import NavMenu from '../NavMenu';
import styled from 'styled-components';

const Title = styled.h1`
  color: #396bf3;
`;

const GameAudio: FC = () => {
  return (
    <div>
      <NavMenu />
      <Title>Audio Game</Title>
    </div>
  );
};

export default GameAudio;
