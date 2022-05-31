import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (isCartOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItems(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};