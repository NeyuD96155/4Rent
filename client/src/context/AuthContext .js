import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    // Here, you might want to check for an existing auth token/session in localStorage or cookies
    // and set the initial auth state accordingly
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({ token });
      // You might also want to validate the token against your backend
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
