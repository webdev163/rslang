import React, { FC } from 'react';
import NavMenu from '../../components/NavMenu';
import styled from 'styled-components';

const Title = styled.h1`
  color: #396bf3;
`;

const StatsPage: FC = () => {
  return (
    <div>
      <NavMenu />
      <Title>Stats Page</Title>
    </div>
  );
};

export default StatsPage;
