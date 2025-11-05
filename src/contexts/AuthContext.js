import React, { createContext, useState, useEffect } from 'react';
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from '../utils/client-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData');
      return storedUserData ? JSON.parse(storedUserData) : null;
    } else {
      return null;
    }
  });

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const onLoginHandler = (token, userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    setAuthToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    removeAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLoginHandler, logout, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
