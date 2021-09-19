import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import "./NavLinks.css";

const NavLinks = (props) => {
  const { loggedIn,logOut } = useContext(AuthContext);
  const {user} = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {loggedIn ? (
        <>
          <li>
            <NavLink to={`/${user._id}/places`}>MY PLACES</NavLink>
          </li>

          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
          <li>
            <button onClick={logOut}>LOGOUT</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
          </li>

        </>
      )}
    </ul>
  );
};

export default NavLinks;
