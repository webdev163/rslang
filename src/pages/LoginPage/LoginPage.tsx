import React, { FC } from 'react';
import NavMenu from '../../components/NavMenu';
import styled from 'styled-components';

const Title = styled.h1`
  color: #396bf3;
`;

const LoginPage: FC = () => {
  return (
    <div>
      <NavMenu />
      <Title>Login Page</Title>
    </div>
  );
};

export default LoginPage;
