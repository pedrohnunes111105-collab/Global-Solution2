import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Globe, Smartphone } from 'lucide-react'; // Trocado para ícones seguros
import loginBg from '../assets/login-bg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, 'email');
      navigate('/dashboard');
    }
  };

  const handleSocialLogin = (provider) => {
    login(`usuario@${provider}.com`, provider);
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-md w-full rounded-2xl border border-[var(--color-accent)] p-8 shadow-2xl" style={{ background: 'rgba(15, 15, 30, 0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-2">Bem-vindo de volta</h2>
          <p className="text-gray-400">Acesse sua conta para continuar</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => handleSocialLogin('google')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-accent)] rounded-lg text-white hover:bg-opacity-80 transition-colors"
          >
            <Globe size={20} className="text-red-400" />
            Google
          </button>
          <button 
            onClick={() => handleSocialLogin('apple')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-accent)] rounded-lg text-white hover:bg-opacity-80 transition-colors"
          >
            <Smartphone size={20} />
            Apple
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-accent)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400" style={{ backgroundColor: 'rgba(15, 15, 30, 0.99)' }}>ou continue com e-mail</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-accent)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-accent)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-accent)] text-white rounded-lg font-bold text-lg hover:bg-opacity-80 transition-colors mt-4"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem conta? <span className="text-[var(--color-highlight)] hover:underline font-medium cursor-pointer">Cadastre-se</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
