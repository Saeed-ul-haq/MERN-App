import React, { useState } from "react";
import {
  addItem,
  clearItem,
  getToken
} from "../util/helpers/localStrorage";


export const AuthContext = React.createContext();

// const params = {
//   id: 1,
//   name: "Jhon Doe",
//   avatar: "https://www.longhash.com/static/common/images/avatar/avatar5.png",
//   roles: ["USER", "ADMIN"]
// };

/**
 * We have used Fake JWT token from "jwt.io"
 * This is a sample token to show auth is working
 * Your token will come from your server when user successfully loggedIn.
 */

// const fakeToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoidGFyZXEgam9iYXllcmUiLCJyb2xlcyI6ImFkbWluIn0.k74_B-zeWket405dIAt018mnQFMh_6_BTFpjB77HtRQ";


export const Logout = () => {
  clearItem("token");
  clearItem("menu");
  clearItem("language");
};

export const getUser = () => {
  const data = localStorage.getItem("token");

  if (data) {
    return JSON.parse(data).userData;
  }
  return null;
};

const isValidToken = () => {
  /**
   *  Using the local storage code....
   */
  const token = localStorage.getItem("token");

  /**
   *  Using the Cookies code...
   */
  //const token = Cookies.get('token');
  // JWT decode & check token validity & expiration.
  if (token) return true;
  return false;
};

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(isValidToken());
  // const [loggedOut, setLoggedOut] = useState(true);
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());

  const signIn = (params) => {
    /**
     * Make post request here to authenticate with fetch
     * if returns true then change the state
     */
   
        setUser(params);
        // setToken(fakeToken);
        setLoggedIn(true);
        addItem("token", {
          // token: fakeToken,
          userData: params,
        });
      
  };

  const signUp =  (params) => {
    setUser(params);
    // setToken(fakeToken);
    setLoggedIn(true);
    addItem("token", {
      // token: fakeToken,
      userData: params,
    });
    return params;
  };

  /**
   * For 3rd-party Authentication [e.g. Autho0, firebase, AWS etc]
   *
   */
  const tokenAuth = (token, user = {}) => {
    setUser(user);
    setToken(token);
    addItem("token", token);
    setLoggedIn(true);
  };

  const forgetPass = (params) => {
    console.log(params, "forget password form Props");
  };
  const changePass = (params) => {
    console.log(params, "change password form Props");
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    clearItem("token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        forgetPass,
        changePass,
        tokenAuth,
        user,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};



export default AuthProvider;
