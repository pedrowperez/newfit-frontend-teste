import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import styled from 'styled-components';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatPrice';

const Cart: React.FC = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cart, removeFromCart, decreaseQuantity, addToCart } = context;

  if (cart.length === 0) {
    return (
      <EmptyContainer>
        <Title>Carrinho Vazio</Title>
        <Button onClick={() => window.location.href = '/'}>Voltar para Home</Button>
      </EmptyContainer>
    );
  }

  const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <ProductInfo>
                  <ProductImage src={item.image} alt={item.title} />
                  <div>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPrice>{formatPrice(item.price)}</ProductPrice>
                  </div>
                </ProductInfo>
              </td>
              <td>
                <QuantityControl>
                  <QuantityButton onClick={() => decreaseQuantity(item.id)}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 8.1V9.9H13.5V8.1H4.5ZM9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM9 16.2C5.031 16.2 1.8 12.969 1.8 9C1.8 5.031 5.031 1.8 9 1.8C12.969 1.8 16.2 5.031 16.2 9C16.2 12.969 12.969 16.2 9 16.2Z" fill="#009EDD"/>
                    </svg>
                  </QuantityButton>
                  <QuantityValue>{item.quantity}</QuantityValue>
                  <QuantityButton onClick={() => addToCart(item)}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.9 4.5H8.1V8.1H4.5V9.9H8.1V13.5H9.9V9.9H13.5V8.1H9.9V4.5ZM9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM9 16.2C5.031 16.2 1.8 12.969 1.8 9C1.8 5.031 5.031 1.8 9 1.8C12.969 1.8 16.2 5.031 16.2 9C16.2 12.969 12.969 16.2 9 16.2Z" fill="#009EDD"/>
                    </svg>
                  </QuantityButton>
                </QuantityControl>
              </td>
              <td>
                <Subtotal>{formatPrice(item.price * item.quantity)}</Subtotal>
              </td>
              <td>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.28571 19C4.28571 20.1 5.44286 21 6.85714 21H17.1429C18.5571 21 19.7143 20.1 19.7143 19V7H4.28571V19ZM21 4H16.5L15.2143 3H8.78571L7.5 4H3V6H21V4Z" fill="#009EDD"/>
                  </svg>
                </RemoveButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TotalContainer>
        <Button onClick={() => window.location.href = '/order-confirmed'}>Finalizar Pedido</Button>
        <Total>Total <TotalValue> {formatPrice(total)}</TotalValue></Total>
      </TotalContainer>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 4px;
  overflow: auto;
  background-color: #fff;
`;

const EmptyContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th {
    text-align: left;
    padding: 10px;
    font-weight: bold;
    font-size: 14px;
    color: #999999;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 91px;
  height: 114px;
  object-fit: cover;
  margin-right: 16px;
`;

const ProductTitle = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 19.07px;
  color: #2F2E41;
  font-weight: 700;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #2F2E41;
  line-height: 21.79px;
  font-weight: 700;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: transparent;
  }
`;

const QuantityValue = styled.span`
  margin: 0 10px;
  font-size: 14px;
  line-height: 19.07px;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  padding: 3.5px 26.5px;
`;

const Subtotal = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  line-height: 21.79px;
  color: #2F2E41;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #dc3545;
  cursor: pointer;

  &:hover {
    color: #a71d2a;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Total = styled.h2`
  font-size: 14px;
  color:#999999;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  line-height: 19.07px;
`;

const TotalValue = styled.span`
  font-size: 24px;
  line-height: 32.68px;
  font-weight: 700;
  color: #2F2E41;
  margin-left: 16px;
`;

const Button = styled.button`
  background-color: #009EDD;
  color: white;
  border: none;
  padding: 8px 30px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;

  &:hover {
    background-color: #0056b3;
  }
`;
