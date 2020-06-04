import React from 'react';
import styled from 'styled-components';

const Backdrop = () => {
  return <Container></Container>;
};

export default Backdrop;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
`;
