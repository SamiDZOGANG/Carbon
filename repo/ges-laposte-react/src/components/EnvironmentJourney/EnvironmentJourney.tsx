import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './EnvironmentJourney.css';

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  impact: string;
  icon: string;
  achieved: boolean;
  details: {
    actions: string[];
    metrics: { label: string; value: string }[];
  };
}

const EnvironmentJourney: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);

  const milestones: Milestone[] = [
    {
      id: 'start',
      year: '2013',
      title: 'Point de Départ',
      description: 'Lancement de notre stratégie environnementale',
      impact: 'Base de référence établie',
      icon: '🚀',
      achieved: true,
      details: {
        actions: [
          'Première mesure complète des émissions',
          'Création d\'une équipe dédiée RSE',
          'Engagement public de réduction'
        ],
        metrics: [
          { label: 'Émissions totales', value: '1.2M tCO₂e' },
          { label: 'Véhicules thermiques', value: '100%' }
        ]
      }
    },
    {
      id: 'elec-start',
      year: '2018',
      title: 'Électrification Massive',
      description: 'Début de la transformation de notre flotte',
      impact: '-15% d\'émissions',
      icon: '⚡',
      achieved: true,
      details: {
        actions: [
          'Premiers 5000 véhicules électriques',
          'Installation bornes de recharge',
          'Formation des conducteurs'
        ],
        metrics: [
          { label: 'Véhicules électriques', value: '5 000' },
          { label: 'Réduction CO₂', value: '-180k tonnes' }
        ]
      }
    },
    {
      id: 'renewable',
      year: '2020',
      title: '100% Énergie Verte',
      description: 'Transition complète vers l\'électricité renouvelable',
      impact: '-25% d\'émissions',
      icon: '🌱',
      achieved: true,
      details: {
        actions: [
          'Contrats 100% énergie renouvelable',
          'Installation panneaux solaires',
          'Optimisation énergétique bâtiments'
        ],
        metrics: [
          { label: 'Bâtiments optimisés', value: '8 500' },
          { label: 'Énergie verte', value: '100%' }
        ]
      }
    },
    {
      id: 'current',
      year: '2024',
      title: 'Accélération',
      description: '39 000 véhicules électriques en service',
      impact: '-42% d\'émissions',
      icon: '🏆',
      achieved: true,
      details: {
        actions: [
          'Leader européen flotte électrique',
          'Programme compensation carbone',
          'Innovation logistique verte'
        ],
        metrics: [
          { label: 'Flotte électrique', value: '39 000' },
          { label: 'CO₂ évité/an', value: '85k tonnes' }
        ]
      }
    },
    {
      id: 'target-2025',
      year: '2025',
      title: 'Objectif Intermédiaire',
      description: 'Réduction de 30% des émissions',
      impact: '-30% vs 2013',
      icon: '🎯',
      achieved: false,
      details: {
        actions: [
          'Extension flotte électrique',
          'Optimisation tournées IA',
          'Partenariats verts'
        ],
        metrics: [
          { label: 'Objectif flotte', value: '45 000' },
          { label: 'Réduction visée', value: '-30%' }
        ]
      }
    },
    {
      id: 'milestone-2030',
      year: '2030',
      title: 'Étape Majeure',
      description: 'Réduction de moitié des émissions',
      impact: '-50% d\'émissions',
      icon: '🌍',
      achieved: false,
      details: {
        actions: [
          'Flotte 100% bas carbone',
          'Bâtiments zéro émission',
          'Supply chain verte'
        ],
        metrics: [
          { label: 'Neutralité scope 1&2', value: '100%' },
          { label: 'Réduction scope 3', value: '-40%' }
        ]
      }
    },
    {
      id: 'net-zero',
      year: '2040',
      title: 'Zéro Émission Nette',
      description: 'Neutralité carbone complète',
      impact: '-90% + compensation',
      icon: '🌟',
      achieved: false,
      details: {
        actions: [
          'Technologies de rupture',
          'Capture carbone à grande échelle',
          'Économie circulaire complète'
        ],
        metrics: [
          { label: 'Réduction absolue', value: '-90%' },
          { label: 'Compensation', value: '100%' }
        ]
      }
    }
  ];

  useIntersectionObserver(journeyRef, (isIntersecting) => {
    if (isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  });

  // Auto-play timeline animation
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < milestones.length) {
        const milestone = milestones[currentIndex];
        // Trigger animation for each milestone
        const element = document.getElementById(`milestone-${milestone.id}`);
        if (element) {
          element.classList.add('revealed');
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isVisible, milestones]);

  return (
    <div className={`environment-journey ${isVisible ? 'visible' : ''}`} ref={journeyRef}>
      <div className="journey-intro">
        <h2 className="section-title">Notre Trajectoire</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>
          Une transformation ambitieuse et méthodique vers la neutralité carbone,
          avec des objectifs validés par la Science Based Targets initiative (SBTi).
          Cet engagement signifie que notre trajectoire est reconnue comme compatible avec les accords de Paris 
          et qu'elle contribue concrètement à limiter le réchauffement climatique en dessous de 1,5°C.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line" />
        <div className="timeline-progress" style={{
          height: `${(milestones.filter(m => m.achieved).length / milestones.length) * 100}%`
        }} />
        
        {/* Indicateur de position actuelle */}
        <div className="current-progress-indicator" style={{
          top: `${(milestones.filter(m => m.achieved).length / milestones.length) * 100}%`
        }}>
          <div className="progress-pulse"></div>
        </div>
        
        <div className="milestones">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              id={`milestone-${milestone.id}`}
              className={`milestone ${milestone.achieved ? 'achieved' : 'future'} ${
                activeMilestone === milestone.id ? 'active' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setActiveMilestone(
                activeMilestone === milestone.id ? null : milestone.id
              )}
            >
              <div className="milestone-marker">
                <div className="marker-icon">{milestone.icon}</div>
                <div className="marker-year">{milestone.year}</div>
                {milestone.achieved && (
                  <div className="achievement-badge">✓</div>
                )}
              </div>
              
              <div className="milestone-content">
                <h4 className="milestone-title">{milestone.title}</h4>
                <p className="milestone-description">{milestone.description}</p>
                <div className="milestone-impact">
                  <span className="impact-label">Impact:</span>
                  <span className="impact-value">{milestone.impact}</span>
                </div>
                {/* Affichage permanent des métriques */}
                <div className="milestone-metrics">
                  {milestone.details.metrics.map((metric, idx) => (
                    <div key={idx} className="metric-inline">
                      <span className="metric-label-small">{metric.label}:</span>
                      <span className="metric-value-small">{metric.value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Actions clés - toujours visibles */}
                <div className="milestone-actions">
                  <h5>Actions clés réalisées :</h5>
                  <ul className="actions-inline">
                    {milestone.details.actions.map((action, idx) => (
                      <li key={idx} className="action-inline">
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {activeMilestone === milestone.id && (
                  <div className="milestone-details">
                    <div className="details-section">
                      <h5>Actions clés</h5>
                      <ul className="actions-list">
                        {milestone.details.actions.map((action, idx) => (
                          <li key={idx} className="action-item">
                            <span className="action-bullet">→</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="details-section">
                      <h5>Métriques</h5>
                      <div className="metrics-list">
                        {milestone.details.metrics.map((metric, idx) => (
                          <div key={idx} className="metric-item">
                            <span className="metric-label">{metric.label}:</span>
                            <span className="metric-value">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* Interactive Features */}
      <div className="journey-features">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h4>Trajectoire SBTi</h4>
          <p>Nos objectifs sont alignés avec la science climatique pour limiter le réchauffement à 1,5°C</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h4>Transparence Totale</h4>
          <p>Reporting complet sur les 3 scopes d'émissions avec audit externe annuel</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h4>Engagement Collectif</h4>
          <p>250 000 collaborateurs mobilisés pour atteindre nos objectifs environnementaux</p>
        </div>
      </div>

    </div>
  );
};

export default EnvironmentJourney;