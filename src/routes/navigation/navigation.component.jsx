import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
// import logo from '';
import CartIcon from "../../component/cart-icon/cart-icon.component";
// import isCartOpen 
import logo from "../../assets/crown.jpg";
import CardDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext (CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img
            style={{ width: "50px", height: "39px" }}
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CardDropdown />}
      </div>
      <Outlet />
    </Fragment>
    
  );
  
};

export default Navigation;
