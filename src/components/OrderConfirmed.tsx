// src/components/OrderConfirmed.tsx
import React from 'react';
import styled from 'styled-components';

const OrderConfirmed: React.FC = () => {
  return (
    <Container>
      <Title>Compra realizada com sucesso!</Title>
      <Image src="/success.png" alt="Compra realizada" />
      <Button onClick={() => window.location.href = '/'}>Voltar</Button>
    </Container>
  );
};

export default OrderConfirmed;

const Container = styled.div`
  padding: 64px 0px;
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #009EDD;
  color: white;
  border: none;
  padding: 11px 33px;
  border-radius:4px;
  font-size: 12px;
  line-height: 16.34px;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background-color: #0056b3;
  }
`;

const Image = styled.img`
  max-width: 295px;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;