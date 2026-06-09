import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Zap, Cpu, ArrowRight } from 'lucide-react';
import loginBg from '../assets/login-bg.png';

const Landing = () => {
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[var(--color-bg-primary)] font-sans text-white">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.12,
          filter: 'blur(20px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="relative z-10">
      {/* Hero Section */}
      <section id="inicio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] text-[var(--color-highlight)] text-sm font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-highlight)] animate-pulse"></span>
          Dados de satélite em tempo real
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Mobilidade urbana movida a <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-highlight)] to-purple-400">
            Inteligência Espacial
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10">
          O UrbanOrbit utiliza dados de satélite e IA para prever padrões de trânsito, alertas climáticos e criar as rotas mais eficientes para você.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/login" className="px-8 py-4 bg-[var(--color-accent)] hover:bg-opacity-80 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 group">
            Começar agora
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-primary)] flex items-center justify-center mb-6 text-[var(--color-highlight)] border border-[var(--color-accent)]">
              <Map size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Mapa em tempo real</h3>
            <p className="text-gray-400 leading-relaxed">
              Visualize fluxos de trânsito, acidentes e condições da via atualizados segundo a segundo com precisão orbital.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-primary)] flex items-center justify-center mb-6 text-[var(--color-highlight)] border border-[var(--color-accent)]">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Alertas inteligentes</h3>
            <p className="text-gray-400 leading-relaxed">
              Receba notificações preditivas sobre chuvas intensas, bloqueios e atrasos no transporte público antes mesmo de sair de casa.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-primary)] flex items-center justify-center mb-6 text-[var(--color-highlight)] border border-[var(--color-accent)]">
              <Cpu size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Rotas com IA</h3>
            <p className="text-gray-400 leading-relaxed">
              Nosso algoritmo analisa milhares de variáveis para sugerir o trajeto mais rápido e seguro, combinando diferentes modais.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Sobre o UrbanOrbit</h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            O UrbanOrbit nasceu da necessidade de transformar dados espaciais em soluções práticas para a mobilidade urbana. 
            Combinamos imagens de satélite, sensores IoT e algoritmos de inteligência artificial para criar uma plataforma 
            que antecipa problemas e otimiza o deslocamento de milhões de pessoas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-4xl font-extrabold text-[var(--color-highlight)] mb-2">12M+</h3>
            <p className="text-gray-400">Deslocamentos analisados por mês</p>
          </div>
          <div className="p-6">
            <h3 className="text-4xl font-extrabold text-[var(--color-highlight)] mb-2">98.5%</h3>
            <p className="text-gray-400">Precisão nas previsões de trânsito</p>
          </div>
          <div className="p-6">
            <h3 className="text-4xl font-extrabold text-[var(--color-highlight)] mb-2">5 cidades</h3>
            <p className="text-gray-400">Cobertura ativa no Brasil</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Landing;
