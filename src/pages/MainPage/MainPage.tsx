import React, { FC } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: #396bf3;
`;

const MainPage: FC = () => {
  return (
    <div className="main-page">
      <Title>Main Page</Title>
    </div>
  );
};

export default MainPage;
