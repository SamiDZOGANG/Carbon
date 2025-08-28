import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import ScenarioComparator from '../ScenarioComparator/ScenarioComparator';
import './ScenarioManager.css';

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

interface ScenarioManagerProps {
  activeScenarios: Scenario[];
  onScenariosChange: (scenarios: Scenario[]) => void;
}

const ScenarioManager: React.FC<ScenarioManagerProps> = ({ 
  activeScenarios, 
  onScenariosChange 
}) => {
  const { state } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);
  const [newScenario, setNewScenario] = useState({
    name: '',
    description: ''
  });
  const [savedScenarios, setSavedScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    loadSavedScenarios();
  }, []);

  const loadSavedScenarios = () => {
    const saved = localStorage.getItem('ges_scenarios');
    if (saved) {
      try {
        const scenarios = JSON.parse(saved).map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt)
        }));
        setSavedScenarios(scenarios);
      } catch (error) {
        console.error('Error loading scenarios:', error);
      }
    }
  };

  const saveScenarios = (scenarios: Scenario[]) => {
    localStorage.setItem('ges_scenarios', JSON.stringify(scenarios));
    setSavedScenarios(scenarios);
  };

  const calculateEmissions = (data: any) => {
    // Calcul simplifié des émissions
    const emissionFactors = {
      batiments: { electricity: 0.0571, gas: 0.227, fuel: 2.68 },
      'flotte-propre': { essence: 2.28, diesel: 2.51 },
      'transport-sous-traite': { distance: 0.15 },
      'deplacements-domicile': { avg_distance: 0.12 },
      'deplacements-professionnels': { train: 0.014, plane: 0.285 },
      'frequentation': { visitors: 0.05 },
      'alimentation': { meals: 3.5 },
      'achats': { paper: 1.84, it_equipment: 0.4 },
      'dechets': { recyclable: 0.021, non_recyclable: 0.467 }
    };

    let total = 0;
    const byCategory: Record<string, number> = {};
    const byScope: Record<string, number> = { '1': 0, '2': 0, '3': 0 };

    Object.entries(data).forEach(([category, categoryData]) => {
      let categoryEmissions = 0;
      const factors = emissionFactors[category as keyof typeof emissionFactors];
      
      if (factors && categoryData) {
        Object.entries(categoryData as any).forEach(([key, value]) => {
          if (factors[key as keyof typeof factors] && typeof value === 'number') {
            categoryEmissions += value * factors[key as keyof typeof factors];
          }
        });
      }

      if (categoryEmissions > 0) {
        const emissions = categoryEmissions / 1000; // Conversion en tCO2e
        byCategory[category] = emissions;
        total += emissions;

        // Attribution aux scopes
        const scope = getScope(category);
        byScope[scope.toString()] += emissions;
      }
    });

    return { total, byCategory, byScope };
  };

  const getScope = (category: string): 1 | 2 | 3 => {
    const scopeMapping: Record<string, 1 | 2 | 3> = {
      'flotte-propre': 1,
      'batiments': 2,
      'transport-sous-traite': 3,
      'deplacements-domicile': 3,
      'deplacements-professionnels': 3,
      'frequentation': 3,
      'alimentation': 3,
      'achats': 3,
      'dechets': 3
    };
    return scopeMapping[category] || 3;
  };

  const createScenario = () => {
    if (!newScenario.name.trim()) return;

    const scenario: Scenario = {
      id: Date.now().toString(),
      name: newScenario.name,
      description: newScenario.description,
      data: { ...state.forms.formData },
      createdAt: new Date(),
      updatedAt: new Date(),
      emissions: calculateEmissions(state.forms.formData)
    };

    const updatedScenarios = [...savedScenarios, scenario];
    saveScenarios(updatedScenarios);
    
    setIsCreating(false);
    setNewScenario({ name: '', description: '' });
  };

  const addToComparison = (scenario: Scenario) => {
    if (activeScenarios.length >= 4) return;
    if (!activeScenarios.find(s => s.id === scenario.id)) {
      onScenariosChange([...activeScenarios, scenario]);
    }
  };

  const removeFromComparison = (scenarioId: string) => {
    onScenariosChange(activeScenarios.filter(s => s.id !== scenarioId));
  };

  const deleteScenario = (scenarioId: string) => {
    const updatedScenarios = savedScenarios.filter(s => s.id !== scenarioId);
    saveScenarios(updatedScenarios);
    removeFromComparison(scenarioId);
  };

  const duplicateScenario = (scenario: Scenario) => {
    const duplicated: Scenario = {
      ...scenario,
      id: Date.now().toString(),
      name: `${scenario.name} (Copie)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedScenarios = [...savedScenarios, duplicated];
    saveScenarios(updatedScenarios);
  };

  return (
    <div className="scenario-manager">
      <div className="scenario-header">
        <button 
          className="create-scenario-btn"
          onClick={() => setIsCreating(true)}
          disabled={!Object.keys(state.forms.formData).length}
        >
          <span className="btn-icon">➕</span>
          Nouveau Scénario
        </button>
      </div>

      {isCreating && (
        <div className="create-scenario-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Créer un nouveau scénario</h4>
              <button 
                className="close-modal"
                onClick={() => setIsCreating(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="scenario-name">Nom du scénario</label>
                <input
                  id="scenario-name"
                  type="text"
                  value={newScenario.name}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="ex: Scénario de référence 2024"
                  maxLength={50}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="scenario-description">Description (optionnelle)</label>
                <textarea
                  id="scenario-description"
                  value={newScenario.description}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez les particularités de ce scénario..."
                  rows={3}
                  maxLength={200}
                />
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn secondary"
                onClick={() => setIsCreating(false)}
              >
                Annuler
              </button>
              <button 
                className="btn primary"
                onClick={createScenario}
                disabled={!newScenario.name.trim()}
              >
                Créer le Scénario
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="scenarios-grid">
        <div className="active-comparison">
          <h4 className="subsection-title">
            Comparaison Active ({activeScenarios.length}/4)
          </h4>
          
          {activeScenarios.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p>Aucun scénario sélectionné pour la comparaison</p>
              <p className="empty-hint">
                Ajoutez des scénarios depuis la liste ci-dessous
              </p>
            </div>
          ) : (
            <div className="active-scenarios">
              {activeScenarios.map((scenario) => (
                <div key={scenario.id} className="active-scenario-card">
                  <div className="scenario-info">
                    <h5 className="scenario-name">{scenario.name}</h5>
                    <p className="scenario-emissions">
                      {scenario.emissions.total.toFixed(2)} tCO2e
                    </p>
                  </div>
                  <button
                    className="remove-scenario"
                    onClick={() => removeFromComparison(scenario.id)}
                    title="Retirer de la comparaison"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeScenarios.length >= 2 && (
          <ScenarioComparator 
            scenarios={activeScenarios}
            onRemoveScenario={removeFromComparison}
          />
        )}

        <div className="saved-scenarios">
          <h4 className="subsection-title">
            Scénarios Sauvegardés ({savedScenarios.length})
          </h4>
          
          {savedScenarios.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💾</div>
              <p>Aucun scénario sauvegardé</p>
              <p className="empty-hint">
                Créez votre premier scénario en remplissant le formulaire
              </p>
            </div>
          ) : (
            <div className="scenarios-list">
              {savedScenarios.map((scenario) => (
                <div key={scenario.id} className="scenario-card">
                  <div className="scenario-content">
                    <div className="scenario-header">
                      <h5 className="scenario-name">{scenario.name}</h5>
                      <div className="scenario-actions">
                        <button
                          className="action-btn add"
                          onClick={() => addToComparison(scenario)}
                          disabled={activeScenarios.length >= 4 || activeScenarios.some(s => s.id === scenario.id)}
                          title="Ajouter à la comparaison"
                        >
                          📊
                        </button>
                        <button
                          className="action-btn duplicate"
                          onClick={() => duplicateScenario(scenario)}
                          title="Dupliquer"
                        >
                          📋
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteScenario(scenario.id)}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    {scenario.description && (
                      <p className="scenario-description">{scenario.description}</p>
                    )}
                    
                    <div className="scenario-metrics">
                      <div className="metric">
                        <span className="metric-label">Total:</span>
                        <span className="metric-value">{scenario.emissions.total.toFixed(2)} tCO2e</span>
                      </div>
                      <div className="scenario-date">
                        Créé le {scenario.createdAt.toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioManager;