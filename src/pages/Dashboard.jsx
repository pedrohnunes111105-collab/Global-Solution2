import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MetricCard from '../components/MetricCard';
import { Activity, BellRing, Clock, CloudRain } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import metricasData from '../data/metricas.json';
import alertasData from '../data/alertas.json';
import loginBg from '../assets/login-bg.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useAuth();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0B1028',
        titleColor: '#F2E8C9',
        bodyColor: '#A6B6FF',
        borderColor: '#2F3C7E',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#2F3C7E', drawBorder: false },
        ticks: { color: '#9CA3AF' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9CA3AF' }
      }
    }
  };

  const chartData = {
    labels: metricasData.graficoFluxo.labels,
    datasets: [
      {
        label: 'Fluxo de Veículos',
        data: metricasData.graficoFluxo.data,
        backgroundColor: metricasData.graficoFluxo.labels.map((_, index) => 
          index === metricasData.graficoFluxo.currentHourIndex ? '#A6B6FF' : '#2F3C7E'
        ),
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Background image — very subtle and blurred */}
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
      <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Bom dia, {user?.name.split(' ')[0]}</h1>
        <p className="text-gray-400">Aqui está o resumo da mobilidade na sua região hoje.</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Índice de Trânsito" 
          value={metricasData.cards.indiceTransito.value} 
          trend={metricasData.cards.indiceTransito.trend} 
          icon={<Activity size={24} />} 
        />
        <MetricCard 
          title="Alertas Ativos" 
          value={metricasData.cards.alertasAtivos.value} 
          trend={metricasData.cards.alertasAtivos.trend} 
          icon={<BellRing size={24} />} 
        />
        <MetricCard 
          title="Tempo Estimado" 
          value={metricasData.cards.tempoEstimado.value} 
          trend={metricasData.cards.tempoEstimado.trend} 
          icon={<Clock size={24} />} 
        />
        <MetricCard 
          title="Chuva Prevista" 
          value={metricasData.cards.chuvaPrevista.value} 
          trend={metricasData.cards.chuvaPrevista.trend} 
          icon={<CloudRain size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6">Fluxo Viário Estimado (Por Hora)</h3>
          <div className="h-64">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>

        {/* Recent Alerts Sidebar */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6">Alertas Recentes</h3>
          <div className="space-y-4">
            {alertasData.slice(0, 3).map((alerta) => (
              <div key={alerta.id} className="flex items-start gap-3 p-3 bg-[var(--color-bg-primary)] rounded-lg border border-transparent hover:border-[var(--color-accent)] transition-colors">
                <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                  alerta.type === 'crítico' ? 'bg-red-500' : 
                  alerta.type === 'atenção' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div>
                  <h4 className="text-sm font-bold text-white">{alerta.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{alerta.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/alertas" className="block w-full mt-6 py-2 text-sm text-center text-[var(--color-highlight)] hover:text-white transition-colors">
            Ver todos os alertas →
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
