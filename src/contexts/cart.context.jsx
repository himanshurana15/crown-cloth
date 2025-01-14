// /* eslint-disable react/prop-types */
// import { createContext, useReducer } from "react";




// const addCartItem = (cartItems, productToAdd) => {
//   //find if cartitem contains product to add
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   //if found increment quantity
//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   //return new array with modified cartItem/ new cart item
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };


// const removeCartItem = (cartItems, cartItemToRemove) => {
//   //find the cart item to remove
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );

//   //check if quantity is equal to 1, if it is remove that item from the cart
//   if( existingCartItem.quantity === 1){
//     return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
//   }

//   //return back cartitems with matching cart item with reduced quantity
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// }

//  const clearCartItem = (cartItems, cartItemToClear) => {
//   return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
// }




// export const CartContext = createContext({
//   isOpenCart: false,
//   setIsCartOpen: () => {},
//   cartItem: [],
//   addItemToCart: () => {},
//   removeItemFromCart: () => {},
//   clearItemFromCart: () => {},
//   cartCount: 0,
//   cartTotal: 0
// });


// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItem: [],
//   cartCount: 0,
//   cartTotal: 0,
// }


// const cartReducer = (state, action ) => {
//   const {type, payload} = action; 


//   switch(type){
//     case 'SET_CART_ITEMS': 
//       return{
//         ...state,
//         ...payload
//       } ;
//     default:
//       throw new Error(`Unhandled type ${type} in cartReducer`);
//   }
// }


// export const CartProvider = ({ children }) => {
//   // const [isCartOpen, setIsCartOpen] = useState(false);
//   // const [cartItems, setCartItems] = useState([]);
//   // const [cartCount, setCartCount] = useState(0);
//   // const [cartTotal, setCartTotal] = useState(0);



//   // useEffect(() => {
//   //   const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
//   //     setCartCount(newCartCount);
//   // },[cartItems]);


//   // useEffect(() => {
//   //   const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);
//   //     setCartTotal(newCartTotal);
//   // },[cartItems])

//   const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

//   const updateCartItemsReducer = (newCartItems) => {
//     const newCartCount = newCartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     );

//     const newCartTotal = newCartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity * cartItem.price,
//       0
//     );
    

//     dispatch({
//       type: "SET_CART_ITEMS",
//       payload: {
//         cartItems: newCartItems,
//         cartTotal: newCartTotal,
//         cartCount: newCartCount,
//       },
//     });

//   };

//   // eslint-disable-next-line no-unused-vars
//   const addItemToCart = (productToAdd) => {
//     const newCartItems= addCartItem(cartItems, productToAdd); 
//     updateCartItemsReducer(newCartItems);
//   };


//   const removeItemToCart = (cartItemToRemove) => {
//     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//     updateCartItemsReducer(newCartItems); 
//   };


//   const clearItemFromCart = (cartItemToClear) => {
//     const newCartItems = clearCartItem(cartItems, cartItemToClear)
//     updateCartItemsReducer(newCartItems); 
//   };


//   const value = { isCartOpen,
//     clearItemFromCart,
//     setIsCartOpen: () => {},
//     cartTotal, 
//     addItemToCart, 
//     removeItemToCart, 
//     cartItems , 
//     cartCount,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export default CartProvider;






/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";  


const addCartItem = (cartItems, productToAdd) => {
  if (!cartItems) return [productToAdd];

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  if (!cartItems) return [];

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  if (!cartItems) return [];

  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isOpenCart: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});


const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN"

}


const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen:payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
      {cartItems: newCartItems,
      cartTotal: newCartTotal,
      cartCount: newCartCount}));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };


  const setIsCartOpen = (bool) => {
    dispatch(createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ));
  };  

  const value = {
    isCartOpen,
    clearItemFromCart,
    setIsCartOpen,
    cartTotal,
    addItemToCart,
    removeItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;