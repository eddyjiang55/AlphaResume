import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
      const phone = localStorage.getItem('phoneNumber');
      if (phone) {
          setPhoneNumber(phone);
      }
  }, []);

  const logout = () => {
      localStorage.removeItem('phoneNumber');
      setPhoneNumber(''); // 清空状态
  };

  return (
      <AuthContext.Provider value={{ phoneNumber, setPhoneNumber, logout }}>
          {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
