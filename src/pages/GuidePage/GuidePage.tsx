import React, { FC } from 'react';
import NavMenu from '../../components/NavMenu';
import styled from 'styled-components';

const Title = styled.h1`
  color: #396bf3;
`;

const GuidePage: FC = () => {
  return (
    <div>
      <NavMenu />
      <Title>Guide Page</Title>
    </div>
  );
};

export default GuidePage;
