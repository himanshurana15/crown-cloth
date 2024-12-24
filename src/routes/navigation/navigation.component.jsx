
import {Outlet ,Link} from 'react-router-dom';
import { Fragment } from 'react';
// import logo from '';
import logo from '../../assets/crown.jpg';
import './navigation.styles.scss';


const Navigation = () => {
    return(
        <Fragment>
             <div className='navigation'>
               <Link className='logo-container' to='/'>
                    <img style={
                        {width:'50px',height:'39px'}
                    } src={logo} alt='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className= 'nav-link' to='/shop'>
                        SHOP
                    </Link>
                    <Link className= 'nav-link' to='/sign-in'>
                        Sign In
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
     
    );
  };

export default Navigation; 