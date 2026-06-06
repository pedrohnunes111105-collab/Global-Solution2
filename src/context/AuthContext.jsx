import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há um token no localStorage ao carregar
    const token = localStorage.getItem('urbanOrbit_token');
    const storedUser = localStorage.getItem('urbanOrbit_user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, provider) => {
    // Mock login implementation
    const mockUser = {
      name: 'João Silva',
      email: email,
      initials: 'JS',
      provider: provider
    };
    const mockToken = 'mock_jwt_token_12345';
    
    localStorage.setItem('urbanOrbit_token', mockToken);
    localStorage.setItem('urbanOrbit_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('urbanOrbit_token');
    localStorage.removeItem('urbanOrbit_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
