/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartitem contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //if found increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItem/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isOpenCart: false,
  setIsCartOpen: () => {},
  cartItem: [],
  addItemToCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);



  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
      setCartCount(newCartCount);
  },[cartItems])

  // eslint-disable-next-line no-unused-vars
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd)); // Fix the issue here
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems , cartCount};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
