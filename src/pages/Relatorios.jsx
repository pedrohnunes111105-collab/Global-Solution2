import React, { useState, useRef } from 'react';
import { Download, TrendingUp, Clock, BellRing, AlertTriangle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import relatoriosData from '../data/relatorios.json';
import loginBg from '../assets/login-bg.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const periodos = [
  { key: 'hoje', label: 'Hoje' },
  { key: 'semana', label: 'Esta semana' },
  { key: 'mes', label: 'Este mês' },
];

const gravidadeCores = {
  'Crítico': '#E24B4A',
  'Atenção': '#EF9F27',
  'Baixo': '#A6B6FF',
};

const statusCores = {
  'Resolvido': '#22c55e',
  'Ativo': '#E24B4A',
  'Pendente': '#EF9F27',
};

const tagCores = {
  'positivo': '#22c55e',
  'atencao': '#EF9F27',
  'critico': '#E24B4A',
};

const cardIcons = [
  <TrendingUp size={22} />,
  <Clock size={22} />,
  <BellRing size={22} />,
  <AlertTriangle size={22} />,
];

const cardLabels = [
  'Total de deslocamentos',
  'Tempo médio por rota',
  'Alertas recebidos',
  'Ocorrências registradas',
];

const cardKeys = ['deslocamentos', 'tempoMedio', 'alertas', 'ocorrencias'];

const Relatorios = () => {
  const [periodoAtivo, setPeriodoAtivo] = useState('semana');
  const chartRef = useRef(null);

  const dados = relatoriosData[periodoAtivo];

  const tituloGrafico = periodoAtivo === 'hoje'
    ? 'Fluxo viário — hoje por hora'
    : periodoAtivo === 'semana'
      ? 'Fluxo viário — últimos 7 dias'
      : 'Fluxo viário — últimas 4 semanas';

  const chartData = {
    labels: dados.fluxo.labels,
    datasets: [
      {
        label: 'Índice de Fluxo (%)',
        data: dados.fluxo.data,
        borderColor: '#A6B6FF',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(166, 182, 255, 0.35)');
          gradient.addColorStop(1, 'rgba(166, 182, 255, 0.0)');
          return gradient;
        },
        borderWidth: 2.5,
        pointBackgroundColor: '#A6B6FF',
        pointBorderColor: '#1A2A4F',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  };

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
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `Fluxo: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#1A2A4F', drawBorder: false },
        ticks: {
          color: '#A6B6FF',
          callback: (value) => `${value}%`,
          font: { size: 12 },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#A6B6FF',
          font: { size: 12 },
        },
      },
    },
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Background blur */}
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
        {/* ── 1. Cabeçalho ── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#F2E8C9' }}>
              Relatórios
            </h1>
            <p className="text-sm mt-1" style={{ color: '#A6B6FF' }}>
              Histórico e indicadores de mobilidade
            </p>
          </div>
          <button
            onClick={handleExportPDF}
            className="print:hidden flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:brightness-125"
            style={{ backgroundColor: '#2F3C7E', color: '#F2E8C9' }}
          >
            <Download size={16} />
            Exportar PDF
          </button>
        </header>

        {/* ── 2. Filtros de período ── */}
        <div className="print:hidden flex flex-wrap gap-2">
          {periodos.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPeriodoAtivo(key)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={
                periodoAtivo === key
                  ? { backgroundColor: '#2F3C7E', color: '#F2E8C9' }
                  : { backgroundColor: 'transparent', border: '1px solid #2F3C7E', color: '#A6B6FF' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── 3. Cards de resumo ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardKeys.map((key, i) => {
            const card = dados.cards[key];
            return (
              <div
                key={key}
                className="rounded-xl p-5 flex flex-col gap-3 transition-all hover:brightness-110"
                style={{
                  backgroundColor: '#1A2A4F',
                  border: '1px solid #2F3C7E',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#A6B6FF' }}>
                    {cardLabels[i]}
                  </span>
                  <span style={{ color: '#A6B6FF' }}>{cardIcons[i]}</span>
                </div>
                <span className="text-3xl font-extrabold" style={{ color: '#F2E8C9' }}>
                  {card.valor}
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                  style={{
                    backgroundColor: `${tagCores[card.tipo]}18`,
                    color: tagCores[card.tipo],
                  }}
                >
                  {card.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── 4. Gráfico de linha ── */}
        <div
          className="rounded-xl p-6 shadow-lg"
          style={{ backgroundColor: '#1A2A4F', border: '1px solid #2F3C7E' }}
        >
          <h3 className="text-lg font-bold mb-6" style={{ color: '#F2E8C9' }}>
            {tituloGrafico}
          </h3>
          <div className="h-72">
            <Line ref={chartRef} options={chartOptions} data={chartData} />
          </div>
        </div>

        {/* ── 5. Tabela de ocorrências ── */}
        <div
          className="rounded-xl shadow-lg overflow-hidden"
          style={{ backgroundColor: '#1A2A4F', border: '1px solid #2F3C7E' }}
        >
          <div className="p-6 pb-4">
            <h3 className="text-lg font-bold" style={{ color: '#F2E8C9' }}>
              Ocorrências registradas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#2F3C7E' }}>
                  {['Data', 'Tipo', 'Local', 'Gravidade', 'Status'].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                      style={{ color: '#F2E8C9' }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dados.ocorrencias.map((oc, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors"
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#1A2A4F' : '#0B1028',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e3060')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#1A2A4F' : '#0B1028')
                    }
                  >
                    <td className="px-6 py-3.5 whitespace-nowrap" style={{ color: '#A6B6FF' }}>
                      {oc.data}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap font-medium" style={{ color: '#F2E8C9' }}>
                      {oc.tipo}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap" style={{ color: '#A6B6FF' }}>
                      {oc.local}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${gravidadeCores[oc.gravidade]}20`,
                          color: gravidadeCores[oc.gravidade],
                        }}
                      >
                        {oc.gravidade}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${statusCores[oc.status]}20`,
                          color: statusCores[oc.status],
                        }}
                      >
                        {oc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
