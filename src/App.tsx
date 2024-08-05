import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Cart from './components/Cart';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import OrderConfirmed from './components/OrderConfirmed';
import GlobalStyle from './styles/GlobalStyle';

const App: React.FC = () => {
  return (
    <CartProvider>
        <GlobalStyle />
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
      </Routes>

    </Router>
    </CartProvider>
  );
};

export default App;

