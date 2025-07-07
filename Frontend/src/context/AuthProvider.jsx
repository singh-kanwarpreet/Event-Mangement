import { createContext, useState } from 'react';
import { login, signup } from '../api/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("authCredentials"));
  return (
    <AuthContext.Provider value={{ login, signup, isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;