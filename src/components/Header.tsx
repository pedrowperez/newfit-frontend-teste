import React, { useContext } from 'react';
import styled from 'styled-components';
import CartContext from '../context/CartContext';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cart } = cartContext;

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const redirectToCart = () => {
    navigate('/cart');
  };

  return (
    <HeaderContainer>
      <Title>WeMovies</Title>
      <CartContainer onClick={redirectToCart}>
        
        <CartInfo>
          <CartText>Meu Carrinho</CartText>
          <CartCount>{totalItems} itens</CartCount>
        </CartInfo>
        <CartIcon>
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.6836 17.2796L20.9055 10.1696C20.8034 10.0261 20.6675 9.90953 20.5097 9.83018C20.3519 9.75083 20.1769 9.71109 20 9.71443C19.6509 9.71443 19.3018 9.86617 19.0945 10.1805L14.3164 17.2796H9.09091C8.49091 17.2796 8 17.7673 8 18.3635C8 18.461 8.01091 18.5585 8.04364 18.6561L10.8145 28.7033C11.0655 29.6137 11.9055 30.2857 12.9091 30.2857H27.0909C28.0945 30.2857 28.9345 29.6137 29.1964 28.7033L31.9673 18.6561L32 18.3635C32 17.7673 31.5091 17.2796 30.9091 17.2796H25.6836ZM16.7273 17.2796L20 12.5107L23.2727 17.2796H16.7273ZM20 25.9503C18.8 25.9503 17.8182 24.9749 17.8182 23.7826C17.8182 22.5904 18.8 21.615 20 21.615C21.2 21.615 22.1818 22.5904 22.1818 23.7826C22.1818 24.9749 21.2 25.9503 20 25.9503Z" fill="white"/>
</svg>
</CartIcon>
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background-color: #2b2d42;
  color: white;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 27.24px;
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const CartIcon = styled.span`
  font-size: 24px;
  margin-left: 10px;
`;

const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CartText = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 19.07px;
`;

const CartCount = styled.span`
  font-size: 12px;
  color: #999999;
  line-height: 16.34px;
`;
