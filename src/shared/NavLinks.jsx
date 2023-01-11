import React , {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { Authcontext } from '../shared/auth-context';
import '../STYLING/navlinks.css';

const NavLinks = () => {

const auth =  useContext(Authcontext);


  return <ul className="nav-links">
    <li><NavLink to="/" exact >HOME</NavLink></li>
    
    <li><NavLink to="/users">USERS</NavLink></li>

    {auth.isloggedin && 
    <li><NavLink to={`/${auth.userId}/products`}> MY PRODUCTS</NavLink></li>
    }
    {auth.isloggedin && 
    <li><NavLink to="/products/new">ADD PRODUCTS</NavLink></li> 
  }
  {!auth.isloggedin && 
    <li><NavLink to="/auth">LOGIN/SIGNUP</NavLink></li>
  }

    {auth.isloggedin && <button onClick={auth.Logout}>LOGOUT</button>}
  </ul>
};

export default NavLinks;