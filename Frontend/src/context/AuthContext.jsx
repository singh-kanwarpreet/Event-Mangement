import { createContext, useState } from 'react';
import { login, signup } from '../api/auth';

export const authFunction = createContext();
 
const AuthContext = ({children}) => {
  const [isLogged,SetIsLogged] = useState(!!localStorage.getItem("authCredentials"));
  return (
    <authFunction.Provider value = {{login,signup,isLogged,SetIsLogged}}>
      {children}
    </authFunction.Provider>
  )
}

export default AuthContext
