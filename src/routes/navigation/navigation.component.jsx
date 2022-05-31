import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user.selector';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles.jsx';
import { selectIsCartOpen } from '../../store/cart/cart.selector.js';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? ( 
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            )
            : (
              <NavLink to='/auth'>
               SIGN IN
              </NavLink>
            )
          }
          <CartIcon />
        </NavLinksContainer>
        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
