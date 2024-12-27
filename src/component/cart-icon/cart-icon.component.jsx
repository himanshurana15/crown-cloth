// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext } from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen,cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      {/* <ShoppingIcon className='shopping-icon'/> */}
      <LiaShoppingBagSolid className="shopping-icon" />

      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
