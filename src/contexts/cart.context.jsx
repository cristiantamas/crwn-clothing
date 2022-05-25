import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: 
      return {
        ...state,
       ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, isCartOpen, cartCount, cartTotal } = state;
  
  const setIsCartOpen = (value) => {
    dispatch(createAction(
      CART_ACTION_TYPES.SET_IS_CART_OPEN,
      value
    ));
  }

  const updateCartItemsReducer = (newCartItems) => {
    const payload = {
      cartItems: newCartItems,
      cartCount: newCartItems.reduce((total, cartItem) => total + cartItem.quantity,  0),
      cartTotal: newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    };
    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      payload
    ));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer (newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer (newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
     const newCartItems = clearCartItems(cartItems, productToClear);
     updateCartItemsReducer (newCartItems);
  };

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