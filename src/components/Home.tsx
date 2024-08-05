import React, { useState, useEffect, useContext } from 'react';
import { Product } from '../types';
import { fetchMovies } from '../services/api';
import styled, { keyframes } from 'styled-components';
import CartContext from '../context/CartContext';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatPrice';

const Home: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cart, addToCart } = cartContext;

  const [movies, setMovies] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [noMovies, setNoMovies] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetchMovies();
        setTimeout(() => {
          if (response.products.length === 0) {
            setNoMovies(true);
          } else {
            setMovies(response.products);
          }
          setLoading(false);
        }, 2000);
      } catch (error) {
        setNoMovies(true);
        setError('Ocorreu um erro ao carregar os filmes. Tente novamente mais tarde.');
        console.error('Fetch error:', error);
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : noMovies ? (
        <NoMoviesMessage>
          <NoMovieTitle>{error ? error : 'Parece que não há nada por aqui :('}</NoMovieTitle>
          <NoMovieImage src="/failed.png" alt="Parece que não há nada por aqui :(" />
          <NoMovieButton onClick={() => window.location.href = '/'}>Recarregar página</NoMovieButton>
        </NoMoviesMessage>
      ) : (
        <MoviesGrid>
          {movies.map((movie) => {
            const cartItem = cart.find((item: CartItem) => item.id === movie.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <MovieCard key={movie.id}>
                <MovieImage src={movie.image} alt={movie.title} />
                <MovieTitle>{movie.title}</MovieTitle>
                <MoviePrice>{formatPrice(movie.price)}</MoviePrice>
                <AddToCartButton
                  onClick={() => addToCart(movie)}
                  hasItems={quantity > 0}
                >
                  <MovieCount>
                    <CartIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15">
                      <g clipPath="url(#clip0)">
                        <path d="M6.267 6H7.4V4.3H9.1V3.167H7.4V1.467H6.267V3.167H4.567V4.3H6.267V6ZM4 11.1C3.377 11.1 2.872 11.61 2.872 12.233C2.872 12.857 3.377 13.367 4 13.367C4.623 13.367 5.133 12.857 5.133 12.233C5.133 11.61 4.623 11.1 4 11.1ZM9.667 11.1C9.043 11.1 8.539 11.61 8.539 12.233C8.539 12.857 9.043 13.367 9.667 13.367C10.29 13.367 10.8 12.857 10.8 12.233C10.8 11.61 10.29 11.1 9.667 11.1ZM4.096 9.258L4.113 9.19L4.623 8.267H8.845C9.27 8.267 9.644 8.034 9.837 7.683L12.024 3.711L11.038 3.167H11.032L10.409 4.3L8.845 7.133H4.867L4.793 6.98L3.524 4.3L2.986 3.167L2.453 2.033H0.6V3.167H1.733L3.773 7.468L3.008 8.856C2.918 9.015 2.867 9.202 2.867 9.4C2.867 10.023 3.377 10.533 4 10.533H10.8V9.4H4.238C4.164 9.4 4.096 9.338 4.096 9.258Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="13.6" height="13.6" fill="white" transform="translate(0.033 0.9)"/>
                        </clipPath>
                      </defs>
                    </CartIcon>
                    {quantity}
                  </MovieCount>
                  Adicionar ao Carrinho
                </AddToCartButton>
              </MovieCard>
            );
          })}
        </MoviesGrid>
      )}
    </Container>
  );
};

export default Home;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #2b2d42;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(338px, 1fr));
  gap: 16px;
`;

const MovieCard = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MovieImage = styled.img`
  width: 100%;
  max-width: 147px;
  height: auto;
  margin-bottom: 10px;
`;

const MovieTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  color: #333333;
  line-height: 16.34px;
`;

const MoviePrice = styled.p`
  font-size: 16px;
  color: #2F2E41;
  font-weight: 700;
  margin: 12px;
`;

const MovieCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 2px;
`;

interface AddToCartButtonProps {
  hasItems: boolean;
}

const AddToCartButton = styled.button<AddToCartButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${(props) => (props.hasItems ? '#039B00' : '#009EDD')};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  width: 100%;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background-color: ${(props) => (props.hasItems ? '#218838' : '#0056b3')};
  }
`;

const CartIcon = styled.svg`
  width: 14px;
  height: 14px;
  fill: white;
`;

const LoadingSpinner = styled.div`
  border: 2px solid #2b2d42;
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
  margin: 100px auto;
`;

const NoMoviesMessage = styled.div`
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

const NoMovieTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const NoMovieButton = styled.button`
  background-color: #009EDD;
  color: white;
  border: none;
  padding: 11px 33px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 16.34px;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background-color: #0056b3;
  }
`;

const NoMovieImage = styled.img`
  max-width: 295px;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;
