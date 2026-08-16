import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * Access hook for AuthContext details
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
