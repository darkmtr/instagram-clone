import React, { createContext, useReducer } from 'react';

const initState = {
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
  }
};

export const AuthContext = createContext(initState);

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const setToken = (token) => {
    localStorage.setItem('token', token);
    dispatch({
      type: 'SET_TOKEN',
      payload: token,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
