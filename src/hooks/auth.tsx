import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextDTO {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextDTO>({} as AuthContextDTO);

function useAuth(): AuthContextDTO {
  const context = useContext(AuthContext);

  if (!context) {
    // no user
    throw new Error('useAuth requires an AuthProvider!');
  }
  return context;
}

// Component <AuthProvider user: AuthState />
const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { user, token } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
