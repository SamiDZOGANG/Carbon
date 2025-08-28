import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './EnvironmentDashboard.css';

interface DashboardMetric {
  id: string;
  title: string;
  value: number;
  unit: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
  description: string;
  lastUpdate: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const EnvironmentDashboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  // Real-time metrics
  const [metrics, setMetrics] = useState<DashboardMetric[]>([
    {
      id: 'co2-reduction',
      title: 'Réduction CO₂',
      value: 42,
      unit: '%',
      target: 90,
      trend: 'down',
      icon: '📉',
      color: '#4a7c59',
      description: 'Progression vers l\'objectif 2040',
      lastUpdate: 'Il y a 2 minutes'
    },
    {
      id: 'electric-fleet',
      title: 'Flotte Électrique',
      value: 39000,
      unit: 'véhicules',
      target: 45000,
      trend: 'up',
      icon: '🚛',
      color: '#7fb069',
      description: 'Véhicules électrifiés en service',
      lastUpdate: 'Temps réel'
    },
    {
      id: 'renewable-energy',
      title: 'Énergie Renouvelable',
      value: 100,
      unit: '%',
      target: 100,
      trend: 'stable',
      icon: '⚡',
      color: '#ffeb3b',
      description: 'Besoins internes couverts',
      lastUpdate: 'Il y a 5 minutes'
    },
    {
      id: 'carbon-offset',
      title: 'Compensation Carbone',
      value: 85,
      unit: '%',
      target: 100,
      trend: 'up',
      icon: '🌱',
      color: '#2d5016',
      description: 'Émissions résiduelles compensées',
      lastUpdate: 'Il y a 1 heure'
    },
    {
      id: 'trees-planted',
      title: 'Arbres Plantés',
      value: 2500000,
      unit: 'arbres',
      target: 3000000,
      trend: 'up',
      icon: '🌳',
      color: '#4d79a4',
      description: 'Programme de reboisement',
      lastUpdate: 'Il y a 30 minutes'
    },
    {
      id: 'co2-saved',
      title: 'CO₂ Évité',
      value: 85000,
      unit: 'tonnes',
      target: 120000,
      trend: 'up',
      icon: '💚',
      color: '#1e3a5f',
      description: 'Tonnes CO₂ évitées cette année',
      lastUpdate: 'Temps réel'
    }
  ]);

  // Chart data for emissions breakdown
  const [emissionsData] = useState<ChartData[]>([
    { label: 'Transport', value: 45, color: '#FF6B6B' },
    { label: 'Bâtiments', value: 25, color: '#4ECDC4' },
    { label: 'Énergie', value: 20, color: '#45B7D1' },
    { label: 'Autres', value: 10, color: '#96CEB4' }
  ]);

  // Progress over time data
  const [progressData] = useState([
    { year: '2013', value: 100, target: 100 },
    { year: '2018', value: 85, target: 90 },
    { year: '2020', value: 75, target: 80 },
    { year: '2022', value: 65, target: 70 },
    { year: '2024', value: 58, target: 60 },
    { year: '2025', value: 50, target: 50 },
    { year: '2030', value: 25, target: 25 },
    { year: '2040', value: 10, target: 10 }
  ]);

  // Initialize intersection observer
  useIntersectionObserver(dashboardRef, (isIntersecting) => {
    if (isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        lastUpdate: 'Temps réel',
        // Small random variations for demo
        value: metric.id === 'electric-fleet' ? 
          Math.min(metric.target, metric.value + Math.floor(Math.random() * 5)) :
          metric.value
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Counter animation state
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isVisible) return;
    
    // Animate all metric values when component becomes visible
    metrics.forEach((metric, index) => {
      let startTime: number;
      const duration = 2000 + index * 200;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const animatedValue = Math.floor(easeOutQuart * metric.value);
        
        setAnimatedValues(prev => ({
          ...prev,
          [metric.id]: animatedValue
        }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    });
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  return (
    <div className={`environment-dashboard ${isVisible ? 'visible' : ''}`} ref={dashboardRef}>
      {/* Live Status */}
      <div className="dashboard-header">
        <div className="status-indicator">
          <div className="status-dot pulsing" />
          <span className="status-text">Données temps réel</span>
        </div>
        <div className="last-updated">
          Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => {
          const animatedValue = animatedValues[metric.id] || 0;
          const progressPercentage = (metric.value / metric.target) * 100;
          
          return (
            <div key={metric.id} className={`metric-card ${metric.trend}`}>
              <div className="metric-header">
                <div className="metric-icon" style={{ backgroundColor: metric.color }}>
                  {metric.icon}
                </div>
                <div className="trend-indicator">
                  {metric.trend === 'up' && '↗️'}
                  {metric.trend === 'down' && '↘️'}
                  {metric.trend === 'stable' && '➡️'}
                </div>
              </div>
              
              <div className="metric-content">
                <h3 className="metric-title">{metric.title}</h3>
                <div className="metric-value">
                  <span className="value-number">
                    {metric.value >= 1000 ? formatNumber(animatedValue) : animatedValue}
                  </span>
                  <span className="value-unit">{metric.unit}</span>
                </div>
                
                <div className="metric-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(progressPercentage, 100)}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                  <span className="progress-text">
                    {progressPercentage.toFixed(0)}% de l'objectif
                  </span>
                </div>
                
                <p className="metric-description">{metric.description}</p>
                <div className="metric-update">{metric.lastUpdate}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Emissions Breakdown Pie Chart */}
        <div className="chart-container">
          <h3 className="chart-title">Répartition des Émissions</h3>
          <div className="pie-chart">
            <svg viewBox="0 0 200 200" className="pie-svg">
              {emissionsData.reduce((acc, data, index) => {
                const startAngle = acc.currentAngle;
                const angle = (data.value / 100) * 360;
                const endAngle = startAngle + angle;
                
                const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const pathData = [
                  `M 100 100`,
                  `L ${x1} ${y1}`,
                  `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');
                
                acc.elements.push(
                  <path
                    key={data.label}
                    d={pathData}
                    fill={data.color}
                    className="pie-slice"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                );
                
                acc.currentAngle = endAngle;
                return acc;
              }, { elements: [] as React.ReactElement[], currentAngle: 0 }).elements}
            </svg>
            
            <div className="pie-legend">
              {emissionsData.map(data => (
                <div key={data.label} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: data.color }}
                  />
                  <span className="legend-label">{data.label}</span>
                  <span className="legend-value">{data.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="chart-container">
          <h3 className="chart-title">Trajectoire de Réduction</h3>
          <div className="timeline-chart">
            <svg viewBox="0 0 400 200" className="timeline-svg">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(y => (
                <line
                  key={y}
                  x1="40"
                  y1={160 - (y * 1.2)}
                  x2="380"
                  y2={160 - (y * 1.2)}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              ))}
              
              {/* Progress line */}
              <polyline
                points={progressData.map((point, index) => 
                  `${60 + index * 40},${160 - point.value * 1.2}`
                ).join(' ')}
                fill="none"
                stroke="#4a7c59"
                strokeWidth="3"
                className="progress-line"
              />
              
              {/* Target line */}
              <polyline
                points={progressData.map((point, index) => 
                  `${60 + index * 40},${160 - point.target * 1.2}`
                ).join(' ')}
                fill="none"
                stroke="#ff6b6b"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="target-line"
              />
              
              {/* Data points */}
              {progressData.map((point, index) => (
                <g key={point.year}>
                  <circle
                    cx={60 + index * 40}
                    cy={160 - point.value * 1.2}
                    r="4"
                    fill="#4a7c59"
                    className="data-point"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                  <text
                    x={60 + index * 40}
                    y={180}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#666"
                  >
                    {point.year}
                  </text>
                </g>
              ))}
              
              {/* Y-axis labels */}
              {[0, 25, 50, 75, 100].map(y => (
                <text
                  key={y}
                  x="30"
                  y={165 - y * 1.2}
                  textAnchor="end"
                  fontSize="12"
                  fill="#666"
                >
                  {y}%
                </text>
              ))}
            </svg>
            
            <div className="timeline-legend">
              <div className="legend-item">
                <div className="legend-line actual" />
                <span>Réduction actuelle</span>
              </div>
              <div className="legend-item">
                <div className="legend-line target" />
                <span>Objectif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="dashboard-cta">
        <div className="cta-content">
          <h3>Contribuez à notre objectif</h3>
          <p>Découvrez comment vos choix de livraison peuvent réduire votre empreinte carbone</p>
          <button className="cta-button">
            <span className="cta-icon">🧮</span>
            Calculer Mon Impact
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentDashboard;
