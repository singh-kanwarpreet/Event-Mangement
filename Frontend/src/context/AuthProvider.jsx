import { createContext, useState } from 'react';
import { login, signup } from '../api/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("authCredentials"));
  const [role, setRole] = useState(JSON.parse(localStorage.getItem("authCredentials"))?.role || '');

  return (
    <AuthContext.Provider value={{ login, signup, isLogged, setIsLogged, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;