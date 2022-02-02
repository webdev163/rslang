import React, { FC } from 'react';
import NavMenu from '../../components/NavMenu';
import styled from 'styled-components';

const Title = styled.h1`
  color: #396bf3;
`;

const MainPage: FC = () => {
  return (
    <div className="main-page">
      <NavMenu />
      <Title>Main Page</Title>
    </div>
  );
};

export default MainPage;
