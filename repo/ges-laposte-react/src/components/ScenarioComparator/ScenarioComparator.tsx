import React, { useState, useMemo, useCallback } from 'react';
import { memoize, formatNumber } from '../../utils/performance';
import { handleKeyboardNavigation, announceToScreenReader } from '../../utils/accessibility';
import './ScenarioComparator.css';

interface Scenario {
  id: string;
  name: string;
  description: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
  emissions: {
    total: number;
    byCategory: Record<string, number>;
    byScope: Record<string, number>;
  };
}

interface ScenarioComparatorProps {
  scenarios: Scenario[];
  onRemoveScenario: (scenarioId: string) => void;
}

const ScenarioComparator: React.FC<ScenarioComparatorProps> = ({ 
  scenarios, 
  onRemoveScenario 
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [sortBy, setSortBy] = useState<'total' | 'date' | 'name'>('total');

  // Announce view mode changes to screen readers
  const handleViewModeChange = useCallback((newMode: 'table' | 'chart') => {
    setViewMode(newMode);
    announceToScreenReader(`Vue changée vers ${newMode === 'table' ? 'tableau' : 'graphique'}`);
  }, []);

  // Handle sort change with accessibility announcement
  const handleSortChange = useCallback((newSort: 'total' | 'date' | 'name') => {
    setSortBy(newSort);
    const sortLabels = {
      total: 'émissions totales',
      date: 'date de création', 
      name: 'nom alphabétique'
    };
    announceToScreenReader(`Tri modifié: ${sortLabels[newSort]}`);
  }, []);

  // Memoized sorting function for performance
  const getSortedScenarios = useMemo(() => {
    return [...scenarios].sort((a, b) => {
      switch (sortBy) {
        case 'total':
          return b.emissions.total - a.emissions.total;
        case 'date':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [scenarios, sortBy]);

  // Memoized calculation for performance
  const getVariationPercentage = useCallback(memoize((scenario: Scenario, baseline: Scenario) => {
    if (baseline.emissions.total === 0) return 0;
    return ((scenario.emissions.total - baseline.emissions.total) / baseline.emissions.total) * 100;
  }), []);

  const getAllCategories = () => {
    const categories = new Set<string>();
    scenarios.forEach(scenario => {
      Object.keys(scenario.emissions.byCategory).forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
  };

  const getCategoryName = (category: string): string => {
    const names: Record<string, string> = {
      batiments: 'Bâtiments',
      'flotte-propre': 'Flotte en propre',
      'transport-sous-traite': 'Transport sous-traité',
      'deplacements-domicile': 'Déplacements domicile-travail',
      'deplacements-professionnels': 'Déplacements professionnels',
      frequentation: 'Fréquentation',
      alimentation: 'Alimentation',
      achats: 'Achats',
      dechets: 'Déchets'
    };
    return names[category] || category;
  };

  if (scenarios.length === 0) {
    return (
      <div className="scenario-comparator">
        <div className="empty-comparator">
          <div className="empty-icon">📊</div>
          <h3>Aucun scénario à comparer</h3>
          <p>Ajoutez au moins 2 scénarios pour démarrer la comparaison</p>
        </div>
      </div>
    );
  }

  const sortedScenarios = getSortedScenarios;
  const baseline = sortedScenarios[0];

  return (
    <div className="scenario-comparator">
      <div className="comparator-header">
        <div className="header-content">
          <h3 className="section-title">Comparaison de Scénarios</h3>
          <p className="section-description">
            Analysez les différences entre vos scénarios d'émissions
          </p>
        </div>
        
        <div className="comparator-controls">
          <div className="control-group">
            <label htmlFor="scenario-sort">Trier par:</label>
            <select 
              id="scenario-sort"
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value as any)}
              className="sort-select"
              aria-describedby="scenario-sort-help"
            >
              <option value="total">Émissions totales</option>
              <option value="date">Date de création</option>
              <option value="name">Nom alphabétique</option>
            </select>
            <div id="scenario-sort-help" className="sr-only">
              Sélectionnez le critère de tri pour les scénarios
            </div>
          </div>
          
          <div className="view-toggle" role="tablist" aria-label="Mode d'affichage">
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('table')}
              role="tab"
              aria-selected={viewMode === 'table'}
              aria-controls="comparison-content"
              onKeyDown={(e) => handleKeyboardNavigation(e, {
                onEnter: () => handleViewModeChange('table'),
                onSpace: () => handleViewModeChange('table')
              })}
            >
              📋 Tableau
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'chart' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('chart')}
              role="tab"
              aria-selected={viewMode === 'chart'}
              aria-controls="comparison-content"
              onKeyDown={(e) => handleKeyboardNavigation(e, {
                onEnter: () => handleViewModeChange('chart'),
                onSpace: () => handleViewModeChange('chart')
              })}
            >
              📊 Graphique
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="comparison-summary">
        <h4>Résumé de la comparaison</h4>
        <div className="summary-metrics">
          <div className="summary-card">
            <div className="summary-label">Scénarios comparés</div>
            <div className="summary-value">{scenarios.length}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Écart maximum</div>
            <div className="summary-value">
              {scenarios.length > 1 ? 
                `${Math.abs(getVariationPercentage(sortedScenarios[sortedScenarios.length - 1], baseline)).toFixed(1)}%` 
                : '0%'
              }
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Moyenne des émissions</div>
            <div className="summary-value">
              {(scenarios.reduce((sum, s) => sum + s.emissions.total, 0) / scenarios.length).toFixed(2)} tCO2e
            </div>
          </div>
        </div>
      </div>

      <div id="comparison-content" role="tabpanel" aria-label={`Contenu en mode ${viewMode}`}>
      {viewMode === 'table' ? (
        <div className="scenarios-table-container">
          <table className="scenarios-table">
            <thead>
              <tr>
                <th>Scénario</th>
                <th>Total (tCO2e)</th>
                <th>Écart vs référence</th>
                <th>Scope 1</th>
                <th>Scope 2</th>
                <th>Scope 3</th>
                <th>Date création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedScenarios.map((scenario, index) => {
                const isBaseline = index === 0;
                const variation = isBaseline ? 0 : getVariationPercentage(scenario, baseline);
                
                return (
                  <tr key={scenario.id} className={isBaseline ? 'baseline-row' : ''}>
                    <td className="scenario-info">
                      <div className="scenario-name">
                        {scenario.name}
                        {isBaseline && <span className="baseline-badge">Référence</span>}
                      </div>
                      {scenario.description && (
                        <div className="scenario-description">{scenario.description}</div>
                      )}
                    </td>
                    <td className="emissions-total">{scenario.emissions.total.toFixed(2)}</td>
                    <td className={`variation ${variation > 0 ? 'positive' : variation < 0 ? 'negative' : 'neutral'}`}>
                      {isBaseline ? '—' : `${variation > 0 ? '+' : ''}${variation.toFixed(1)}%`}
                    </td>
                    <td>{scenario.emissions.byScope['1']?.toFixed(2) || '0.00'}</td>
                    <td>{scenario.emissions.byScope['2']?.toFixed(2) || '0.00'}</td>
                    <td>{scenario.emissions.byScope['3']?.toFixed(2) || '0.00'}</td>
                    <td>{scenario.createdAt.toLocaleDateString('fr-FR')}</td>
                    <td>
                      <button
                        className="remove-scenario-btn"
                        onClick={() => onRemoveScenario(scenario.id)}
                        title="Retirer de la comparaison"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="scenarios-chart">
          <div className="chart-container">
            <h4>Comparaison visuelle des émissions totales</h4>
            <div className="chart-bars">
              {sortedScenarios.map((scenario, index) => {
                const maxEmissions = Math.max(...scenarios.map(s => s.emissions.total));
                const percentage = (scenario.emissions.total / maxEmissions) * 100;
                const isBaseline = index === 0;
                
                return (
                  <div key={scenario.id} className="chart-bar-container">
                    <div className="chart-bar">
                      <div 
                        className="bar-fill"
                        style={{ 
                          height: `${percentage}%`,
                          backgroundColor: isBaseline ? '#003366' : '#FFD100'
                        }}
                      >
                        <div className="bar-value">{scenario.emissions.total.toFixed(1)}</div>
                      </div>
                    </div>
                    <div className="bar-label">
                      <div className="scenario-name">
                        {scenario.name}
                        {isBaseline && <span className="baseline-indicator">📊</span>}
                      </div>
                      <div className="scenario-date">{scenario.createdAt.toLocaleDateString('fr-FR')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category breakdown chart */}
          <div className="category-breakdown-chart">
            <h4>Répartition par catégorie</h4>
            <div className="categories-comparison">
              {getAllCategories().map(category => (
                <div key={category} className="category-comparison">
                  <div className="category-header">
                    <span className="category-name">{getCategoryName(category)}</span>
                  </div>
                  <div className="category-bars">
                    {sortedScenarios.map(scenario => {
                      const value = scenario.emissions.byCategory[category] || 0;
                      const maxValue = Math.max(...scenarios.map(s => s.emissions.byCategory[category] || 0));
                      const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                      
                      return (
                        <div key={scenario.id} className="category-bar">
                          <div 
                            className="category-bar-fill"
                            style={{ width: `${percentage}%` }}
                          />
                          <span className="category-bar-value">{value.toFixed(1)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ScenarioComparator;