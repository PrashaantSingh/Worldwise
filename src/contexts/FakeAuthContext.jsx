// import { createContext, useContext, useReducer } from "react";
// import PropTypes from 'prop-types'
// const AuthContext=createContext();
// const initialState={user:null,isAuthenticated:false}

// const FAKE_USER = {
//     name: "Jack",
//     email: "jack@example.com",
//     password: "qwerty",
//     avatar: "https://i.pravatar.cc/100?u=zz",
//   };

// function reducer(state,action){
//     switch(action.type){
//         case 'login':return {...state,user:action.payload,isAuthenticated:true}
//         case 'logout':return {...state,user:null,isAuthenticated:false}
//         default: throw new Error('unknown action')
//     }
// }

// function AuthProvider({children}){
//     const [{user,isAuthenticated},dispatch]=useReducer(reducer,initialState)
//     function login(email,password){
//         if(email===FAKE_USER.email && password===FAKE_USER.password)dispatch({type:'login',user:FAKE_USER})
//     }
//     function logout(){
//         dispatch({type:'logout'})
//     }
//     return <AuthContext.Provider value={{user,isAuthenticated,login,logout}}>{children}</AuthContext.Provider>
// }
// function useAuth(){
//     const context=useContext(AuthContext);
//     if(context===undefined)throw new Error('AuthContext was used outside the AuthProvider')
//         return context;
// }
// export {AuthProvider,useAuth}

// AuthProvider.propTypes={
//     children:PropTypes.object
// }

import  { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const FAKE_USER = {
  email: 'user@example.com',
  password: 'password123',
};

function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.user, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', user: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, isAuthenticated: state.isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext was used outside the AuthProvider');
  }
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };