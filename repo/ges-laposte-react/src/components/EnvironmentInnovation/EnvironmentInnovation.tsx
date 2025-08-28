import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './EnvironmentInnovation.css';

interface Innovation {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  image: string;
  stats: { label: string; value: string }[];
  technologies: string[];
  featured: boolean;
}

const EnvironmentInnovation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInnovation, setSelectedInnovation] = useState<Innovation | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const innovationRef = useRef<HTMLDivElement>(null);

  const innovations: Innovation[] = [
    {
      id: 'electric-fleet',
      title: 'Flotte 100% Électrique',
      category: 'transport',
      description: 'La plus grande flotte de véhicules électriques d\'Europe pour une livraison zéro émission en ville',
      impact: '-85 000 tonnes CO₂/an',
      image: '🚛',
      stats: [
        { label: 'Véhicules électriques', value: '39 000' },
        { label: 'VAE (vélos)', value: '23 000' },
        { label: 'Bornes de recharge', value: '8 500' }
      ],
      technologies: ['Batteries lithium-ion', 'Recharge rapide', 'Gestion intelligente'],
      featured: true
    },
    {
      id: 'green-buildings',
      title: 'Bâtiments Haute Performance',
      category: 'infrastructure',
      description: 'Optimisation énergétique maximale avec 100% d\'électricité renouvelable',
      impact: '-30% consommation énergétique',
      image: '🏢',
      stats: [
        { label: 'Sites optimisés', value: '8 500' },
        { label: 'Panneaux solaires', value: '250 000 m²' },
        { label: 'Économie énergie', value: '40 GWh/an' }
      ],
      technologies: ['Isolation thermique', 'LED intelligent', 'Capteurs IoT'],
      featured: true
    },
    {
      id: 'biofuels',
      title: 'Biocarburants Avancés',
      category: 'carburants',
      description: 'Utilisation de biocarburants de nouvelle génération pour les véhicules lourds',
      impact: '-70% émissions vs diesel',
      image: '⛽',
      stats: [
        { label: 'Véhicules convertis', value: '5 000' },
        { label: 'Litres biocarburant/an', value: '10M' },
        { label: 'CO₂ évité', value: '25k tonnes' }
      ],
      technologies: ['HVO100', 'B100 biodiesel', 'Biogaz comprimé'],
      featured: false
    },
    {
      id: 'smart-logistics',
      title: 'Logistique Intelligente',
      category: 'digital',
      description: 'IA et Big Data pour optimiser les tournées et réduire les distances parcourues',
      impact: '-15% distances parcourues',
      image: '🤖',
      stats: [
        { label: 'Tournées optimisées/jour', value: '30 000' },
        { label: 'Km économisés/an', value: '50M' },
        { label: 'Taux de remplissage', value: '+25%' }
      ],
      technologies: ['Machine Learning', 'Optimisation dynamique', 'Prédiction trafic'],
      featured: true
    },
    {
      id: 'carbon-capture',
      title: 'Capture Carbone',
      category: 'compensation',
      description: 'Technologies de capture et séquestration du CO₂ atmosphérique',
      impact: '100% compensation émissions résiduelles',
      image: '🌿',
      stats: [
        { label: 'Projets actifs', value: '42' },
        { label: 'CO₂ capturé/an', value: '120k tonnes' },
        { label: 'Arbres plantés', value: '2.5M' }
      ],
      technologies: ['Reboisement', 'Sols agricoles', 'Direct Air Capture'],
      featured: false
    },
    {
      id: 'hydrogen',
      title: 'Hydrogène Vert',
      category: 'futur',
      description: 'Expérimentation de véhicules à hydrogène pour le transport longue distance',
      impact: 'Zéro émission directe',
      image: '💧',
      stats: [
        { label: 'Véhicules test', value: '50' },
        { label: 'Autonomie', value: '600 km' },
        { label: 'Temps recharge', value: '15 min' }
      ],
      technologies: ['Pile à combustible', 'Électrolyse verte', 'Stockage haute pression'],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes', icon: '🌍' },
    { id: 'transport', label: 'Transport', icon: '🚛' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🏢' },
    { id: 'carburants', label: 'Carburants', icon: '⛽' },
    { id: 'digital', label: 'Digital', icon: '🤖' },
    { id: 'compensation', label: 'Compensation', icon: '🌿' },
    { id: 'futur', label: 'Futur', icon: '🚀' }
  ];

  useIntersectionObserver(innovationRef, (isIntersecting) => {
    if (isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  });

  const filteredInnovations = selectedCategory === 'all' 
    ? innovations 
    : innovations.filter(i => i.category === selectedCategory);

  return (
    <div className={`environment-innovation ${isVisible ? 'visible' : ''}`} ref={innovationRef}>
      {/* Category Filter */}
      <div className="innovation-filters">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="filter-icon">{cat.icon}</span>
            <span className="filter-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Innovation Gallery */}
      <div className="innovation-gallery">
        {filteredInnovations.map((innovation, index) => (
          <div
            key={innovation.id}
            className={`innovation-card ${innovation.featured ? 'featured' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedInnovation(innovation)}
          >
            {innovation.featured && (
              <div className="featured-badge">⭐ Innovation Phare</div>
            )}
            
            <div className="innovation-header">
              <div className="innovation-icon">{innovation.image}</div>
              <div className="innovation-category">
                {categories.find(c => c.id === innovation.category)?.label}
              </div>
            </div>
            
            <h3 className="innovation-title">{innovation.title}</h3>
            <p className="innovation-description">{innovation.description}</p>
            
            <div className="innovation-impact">
              <span className="impact-icon">🎯</span>
              <span className="impact-text">{innovation.impact}</span>
            </div>
            
            <div className="innovation-stats">
              {innovation.stats.slice(0, 2).map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <button className="innovation-cta">
              Découvrir <span className="cta-arrow">→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Innovation Modal */}
      {selectedInnovation && (
        <div className="innovation-modal" onClick={() => setSelectedInnovation(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedInnovation(null)}
              aria-label="Fermer"
            >
              ✕
            </button>
            
            <div className="modal-header">
              <div className="modal-icon">{selectedInnovation.image}</div>
              <div className="modal-title-section">
                <h2 className="modal-title">{selectedInnovation.title}</h2>
                <div className="modal-category">
                  {categories.find(c => c.id === selectedInnovation.category)?.label}
                </div>
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedInnovation.description}</p>
              
              <div className="modal-impact">
                <h3>Impact Environnemental</h3>
                <div className="impact-value">{selectedInnovation.impact}</div>
              </div>
              
              <div className="modal-stats">
                <h3>Chiffres Clés</h3>
                <div className="stats-grid">
                  {selectedInnovation.stats.map((stat, idx) => (
                    <div key={idx} className="modal-stat">
                      <div className="modal-stat-value">{stat.value}</div>
                      <div className="modal-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-technologies">
                <h3>Technologies Utilisées</h3>
                <div className="tech-tags">
                  {selectedInnovation.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button className="modal-btn primary">
                  En savoir plus
                </button>
                <button className="modal-btn secondary">
                  Partager cette innovation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partners Section */}
      <div className="partners-section">
        <h3 className="partners-title">Nos Partenaires Technologiques</h3>
        <div className="partners-grid">
          {['Renault', 'EDF', 'Total Energies', 'Engie', 'Veolia', 'Microsoft'].map((partner, idx) => (
            <div key={idx} className="partner-card">
              <div className="partner-logo">{partner.charAt(0)}</div>
              <div className="partner-name">{partner}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Innovation CTA */}
      <div className="innovation-cta-section">
        <h3>Participez à l'Innovation</h3>
        <p>Rejoignez-nous dans notre quête d'innovation pour un avenir durable</p>
        <div className="cta-buttons">
          <button className="cta-btn primary">
            <span className="btn-icon">💡</span>
            Proposer une Innovation
          </button>
          <button className="cta-btn secondary">
            <span className="btn-icon">🤝</span>
            Devenir Partenaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentInnovation;