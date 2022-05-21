import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
  
  if (existingCartItem) {
    return cartItems.map(item =>  item.id === productToAdd.id 
      ? {...item, quantity: item.quantity + 1}
      : item
    );
  }

  return [
    ...cartItems,
    { ...productToAdd, quantity: 1 },
  ];
};

const removeCartItem = (cartItems, productToRemove) => {
  const cartItem = cartItems.find(item => item.id === productToRemove.id);
  
  if (cartItem.quantity > 1) {
    return cartItems.map(item =>  item.id === productToRemove.id 
      ? {...item, quantity: item.quantity - 1}
      : item
    );
  }

  return cartItems.filter(item => item.id !== productToRemove.id);
}

const clearCartItems = (cartItems, productToClear) => {
  return cartItems.filter(item => item.id !== productToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,

  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},

  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
     setCartItems(clearCartItems(cartItems, productToClear));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = { 
    isCartOpen, 
    setIsCartOpen,
    cartItems, 
    addItemToCart, 
    removeItemFromCart,  
    clearItemFromCart, 
    cartCount,
    cartTotal };
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}