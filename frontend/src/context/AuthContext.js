import { createContext } from 'react';

const AuthContext = createContext({
  token: null,
  user: null,
  userId: null,
  profile: null,
  completeProfile: () => {},
  login: () => {},
  logout: () => {},
});

export default AuthContext;
