import React, { useState, useMemo, useCallback } from 'react';
import { formatNumber } from '../../utils/performance';
import { handleKeyboardNavigation, announceToScreenReader } from '../../utils/accessibility';
import './EntityComparator.css';

interface Entity {
  id: string;
  name: string;
  type: string;
  location: string;
  emissions: {
    total: number;
    scope1: number;
    scope2: number;
    scope3: number;
    intensity: number; // par employé
  };
  employees: number;
  surface: number;
  lastUpdate: Date;
}

interface EntityComparatorProps {
  entities: Entity[];
  onEntitiesChange: (entities: Entity[]) => void;
}

const EntityComparator: React.FC<EntityComparatorProps> = ({ entities, onEntitiesChange }) => {
  const [sortBy, setSortBy] = useState<'total' | 'intensity' | 'efficiency'>('total');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  // Données d'exemple - en production, cela viendrait d'une API
  const sampleEntities: Entity[] = [
    {
      id: '1',
      name: 'Centre Distribution Nord',
      type: 'centre-distribution',
      location: 'Lille',
      emissions: { total: 1250.5, scope1: 85.3, scope2: 245.8, scope3: 919.4, intensity: 2.8 },
      employees: 450,
      surface: 15000,
      lastUpdate: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Bureau Poste Central Paris',
      type: 'bureau-poste',
      location: 'Paris',
      emissions: { total: 890.2, scope1: 45.6, scope2: 180.4, scope3: 664.2, intensity: 3.2 },
      employees: 280,
      surface: 8500,
      lastUpdate: new Date('2024-01-12')
    },
    {
      id: '3',
      name: 'Plateforme Colis Sud',
      type: 'plateforme-colis',
      location: 'Marseille',
      emissions: { total: 2100.8, scope1: 180.5, scope2: 420.6, scope3: 1499.7, intensity: 3.8 },
      employees: 550,
      surface: 25000,
      lastUpdate: new Date('2024-01-18')
    },
    {
      id: '4',
      name: 'Direction Régionale Ouest',
      type: 'direction-regionale',
      location: 'Nantes',
      emissions: { total: 650.3, scope1: 25.2, scope2: 95.8, scope3: 529.3, intensity: 4.1 },
      employees: 160,
      surface: 3200,
      lastUpdate: new Date('2024-01-20')
    },
    {
      id: '5',
      name: 'Centre Tri Automatisé Est',
      type: 'centre-distribution',
      location: 'Strasbourg',
      emissions: { total: 1850.7, scope1: 120.4, scope2: 310.8, scope3: 1419.5, intensity: 2.5 },
      employees: 740,
      surface: 18000,
      lastUpdate: new Date('2024-01-10')
    }
  ];

  const allEntities = [...sampleEntities, ...entities];

  // Memoized sorting for better performance
  const getSortedEntities = useMemo(() => {
    return [...allEntities].sort((a, b) => {
      switch (sortBy) {
        case 'total':
          return b.emissions.total - a.emissions.total;
        case 'intensity':
          return b.emissions.intensity - a.emissions.intensity;
        case 'efficiency':
          return (a.emissions.total / a.surface) - (b.emissions.total / b.surface);
        default:
          return 0;
      }
    });
  }, [allEntities, sortBy]);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'centre-distribution': 'Centre Distribution',
      'bureau-poste': 'Bureau de Poste',
      'plateforme-colis': 'Plateforme Colis',
      'direction-regionale': 'Direction Régionale',
      'autre': 'Autre'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'centre-distribution': '#3b82f6',
      'bureau-poste': '#10b981',
      'plateforme-colis': '#f59e0b',
      'direction-regionale': '#8b5cf6',
      'autre': '#6b7280'
    };
    return colors[type] || '#6b7280';
  };

  const calculateAverage = (key: keyof Entity['emissions']) => {
    const sum = allEntities.reduce((acc, entity) => acc + entity.emissions[key], 0);
    return sum / allEntities.length;
  };

  const getBenchmarkStatus = (entity: Entity, metric: keyof Entity['emissions']) => {
    const average = calculateAverage(metric);
    const value = entity.emissions[metric];
    
    if (value < average * 0.8) return 'excellent';
    if (value < average) return 'good';
    if (value < average * 1.2) return 'average';
    return 'poor';
  };

  const toggleEntitySelection = (entityId: string) => {
    setSelectedEntities(prev => 
      prev.includes(entityId)
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  const selectedEntityData = allEntities.filter(e => selectedEntities.includes(e.id));

  // Accessibility handlers
  const handleSortChange = useCallback((newSort: 'total' | 'intensity' | 'efficiency') => {
    setSortBy(newSort);
    const sortLabels = {
      total: 'émissions totales',
      intensity: 'intensité carbone', 
      efficiency: 'efficacité par surface'
    };
    announceToScreenReader(`Tri modifié: ${sortLabels[newSort]}`);
  }, []);

  const handleViewModeChange = useCallback((newMode: 'table' | 'chart') => {
    setViewMode(newMode);
    announceToScreenReader(`Vue changée vers ${newMode === 'table' ? 'tableau' : 'graphique'}`);
  }, []);

  return (
    <div className="entity-comparator">
      <div className="comparator-header">
        <div className="comparator-controls">
          <div className="control-group">
            <label>Trier par:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="sort-select"
            >
              <option value="total">Émissions totales</option>
              <option value="intensity">Intensité carbone</option>
              <option value="efficiency">Efficacité (tCO2e/m²)</option>
            </select>
          </div>
          
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              📋 Tableau
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'chart' ? 'active' : ''}`}
              onClick={() => setViewMode('chart')}
            >
              📊 Graphique
            </button>
          </div>
        </div>
      </div>

      {selectedEntities.length > 0 && (
        <div className="comparison-summary">
          <h4>Analyse comparative ({selectedEntities.length} entités sélectionnées)</h4>
          <div className="summary-metrics">
            <div className="summary-card">
              <div className="summary-label">Émissions totales</div>
              <div className="summary-value">
                {selectedEntityData.reduce((sum, e) => sum + e.emissions.total, 0).toFixed(1)} tCO2e
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Intensité moyenne</div>
              <div className="summary-value">
                {(selectedEntityData.reduce((sum, e) => sum + e.emissions.intensity, 0) / selectedEntityData.length).toFixed(1)} tCO2e/emp
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Total employés</div>
              <div className="summary-value">
                {selectedEntityData.reduce((sum, e) => sum + e.employees, 0)} pers.
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'table' ? (
        <div className="entities-table-container">
          <table className="entities-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedEntities.length === allEntities.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEntities(allEntities.map(e => e.id));
                      } else {
                        setSelectedEntities([]);
                      }
                    }}
                  />
                </th>
                <th>Entité</th>
                <th>Type</th>
                <th>Localisation</th>
                <th>Employés</th>
                <th>Surface (m²)</th>
                <th>Total (tCO2e)</th>
                <th>Scope 1</th>
                <th>Scope 2</th>
                <th>Scope 3</th>
                <th>Intensité</th>
                <th>Performance</th>
                <th>Dernière MAJ</th>
              </tr>
            </thead>
            <tbody>
              {getSortedEntities.map((entity) => (
                <tr 
                  key={entity.id}
                  className={selectedEntities.includes(entity.id) ? 'selected' : ''}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEntities.includes(entity.id)}
                      onChange={() => toggleEntitySelection(entity.id)}
                    />
                  </td>
                  <td className="entity-name">
                    <div className="entity-info">
                      <span className="name">{entity.name}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="entity-type-badge"
                      style={{ backgroundColor: getTypeColor(entity.type) }}
                    >
                      {getTypeLabel(entity.type)}
                    </span>
                  </td>
                  <td>{entity.location}</td>
                  <td>{entity.employees}</td>
                  <td>{entity.surface.toLocaleString()}</td>
                  <td className="emissions-total">{entity.emissions.total.toFixed(1)}</td>
                  <td>{entity.emissions.scope1.toFixed(1)}</td>
                  <td>{entity.emissions.scope2.toFixed(1)}</td>
                  <td>{entity.emissions.scope3.toFixed(1)}</td>
                  <td>{entity.emissions.intensity.toFixed(1)}</td>
                  <td>
                    <span 
                      className={`performance-badge ${getBenchmarkStatus(entity, 'total')}`}
                    >
                      {getBenchmarkStatus(entity, 'total')}
                    </span>
                  </td>
                  <td>{entity.lastUpdate.toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="entities-chart">
          <div className="chart-container">
            <h4>Comparaison visuelle des émissions</h4>
            <div className="chart-bars">
              {getSortedEntities.map((entity, index) => {
                const maxEmissions = Math.max(...allEntities.map(e => e.emissions.total));
                const percentage = (entity.emissions.total / maxEmissions) * 100;
                
                return (
                  <div key={entity.id} className="chart-bar-container">
                    <div className="chart-bar">
                      <div 
                        className="bar-fill"
                        style={{ 
                          height: `${percentage}%`,
                          backgroundColor: getTypeColor(entity.type)
                        }}
                      >
                        <div className="bar-value">{entity.emissions.total.toFixed(0)}</div>
                      </div>
                    </div>
                    <div className="bar-label">
                      <div className="entity-name">{entity.name}</div>
                      <div className="entity-location">{entity.location}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="benchmarking-section">
        <h4>Analyse de Performance</h4>
        <div className="benchmark-grid">
          <div className="benchmark-card">
            <h5>🏆 Meilleure Performance</h5>
            {(() => {
              const best = [...allEntities].sort((a, b) => a.emissions.intensity - b.emissions.intensity)[0];
              return best ? (
                <div className="benchmark-entity">
                  <div className="entity-name">{best.name}</div>
                  <div className="entity-metric">{best.emissions.intensity.toFixed(1)} tCO2e/employé</div>
                </div>
              ) : <div>Aucune donnée</div>;
            })()}
          </div>
          
          <div className="benchmark-card">
            <h5>📊 Moyenne Groupe</h5>
            <div className="benchmark-metric">
              <div className="metric-value">{calculateAverage('total').toFixed(1)} tCO2e</div>
              <div className="metric-label">Émissions moyennes</div>
            </div>
          </div>
          
          <div className="benchmark-card">
            <h5>🎯 Objectif Recommandé</h5>
            <div className="benchmark-metric">
              <div className="metric-value">{(calculateAverage('intensity') * 0.8).toFixed(1)} tCO2e/emp</div>
              <div className="metric-label">-20% vs moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityComparator;