import React, { useState } from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

interface Building {
  building_number: string;
  building_name: string;
  full_address: string;
  construction_year: number;
  surface_total: number;
  surface_occupied: number;
  electricity_network: string;
  water_consumption: number;
  electric_heating_usage: string;
  heating_network: string;
  natural_gas_consumption: number;
  propane_consumption: number;
}

interface BuildingsFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const BuildingsForm: React.FC<BuildingsFormProps> = ({ data, onChange }) => {
  const [buildings, setBuildings] = useState<Building[]>(data.buildings || [{}]);

  const addBuilding = () => {
    const newBuildings = [...buildings, {
      building_number: '',
      building_name: '',
      full_address: '',
      construction_year: new Date().getFullYear(),
      surface_total: 0,
      surface_occupied: 0,
      electricity_network: '',
      water_consumption: 0,
      electric_heating_usage: '',
      heating_network: '',
      natural_gas_consumption: 0,
      propane_consumption: 0
    }];
    setBuildings(newBuildings);
    onChange('buildings', newBuildings);
  };

  const removeBuilding = (index: number) => {
    const newBuildings = buildings.filter((_, i) => i !== index);
    setBuildings(newBuildings);
    onChange('buildings', newBuildings);
  };

  const updateBuilding = (index: number, field: string, value: any) => {
    const newBuildings = [...buildings];
    newBuildings[index] = { ...newBuildings[index], [field]: value };
    setBuildings(newBuildings);
    onChange('buildings', newBuildings);
  };

  return (
    <div className="form-sections">
      <div className="form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Liste des bâtiments</h3>
          <button type="button" onClick={addBuilding} className="btn-primary">
            + Ajouter un bâtiment
          </button>
        </div>
        
        {buildings.map((building, index) => (
          <div key={index} className="building-card" style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '20px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4>Bâtiment {index + 1}</h4>
              {buildings.length > 1 && (
                <button type="button" onClick={() => removeBuilding(index)} className="btn-danger">
                  Supprimer
                </button>
              )}
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <div className="field-with-info">
                  <label>N° du bâtiment</label>
                  <InfoTooltip 
                    formula="Identifiant unique du bâtiment"
                    explanation="Utilisé pour l'identification et le suivi des émissions par bâtiment"
                  />
                </div>
                <input
                  type="text"
                  value={building.building_number || ''}
                  onChange={(e) => updateBuilding(index, 'building_number', e.target.value)}
                  placeholder="Numéro du bâtiment"
                />
              </div>

              <div className="form-group">
                <div className="field-with-info">
                  <label>Nom du bâtiment</label>
                  <InfoTooltip 
                    formula="Dénomination du bâtiment"
                    explanation="Utilisé pour identifier le bâtiment dans les rapports"
                  />
                </div>
                <input
                  type="text"
                  value={building.building_name || ''}
                  onChange={(e) => updateBuilding(index, 'building_name', e.target.value)}
                  placeholder="Nom du bâtiment"
                />
              </div>

              <div className="form-group">
                <div className="field-with-info">
                  <label>Année de construction</label>
                  <InfoTooltip 
                    formula="Impact sur l'efficacité énergétique"
                    explanation="Les bâtiments plus anciens ont généralement une consommation énergétique plus élevée"
                  />
                </div>
                <input
                  type="number"
                  min="1800"
                  max="2025"
                  value={building.construction_year || ''}
                  onChange={(e) => updateBuilding(index, 'construction_year', parseInt(e.target.value))}
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="field-with-info">
                <label>Adresse complète</label>
                <InfoTooltip 
                  formula="Localisation géographique"
                  explanation="Permet l'identification précise du site et le calcul des facteurs climatiques"
                />
              </div>
              <input
                type="text"
                value={building.full_address || ''}
                onChange={(e) => updateBuilding(index, 'full_address', e.target.value)}
                placeholder="Adresse complète du bâtiment"
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <div className="field-with-info">
                  <label>Surface (m²)</label>
                  <InfoTooltip 
                    formula="Émissions = Surface × Facteur d'émission par m²"
                    explanation="Surface totale du bâtiment, base de calcul pour les ratios énergétiques"
                  />
                </div>
                <input
                  type="number"
                  min="0"
                  value={building.surface_total || ''}
                  onChange={(e) => updateBuilding(index, 'surface_total', parseInt(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <div className="field-with-info">
                  <label>Surface occupée (m²)</label>
                  <InfoTooltip 
                    formula="Émissions = Surface occupée × Facteur d'occupation"
                    explanation="Surface réellement utilisée, influence la consommation énergétique réelle"
                  />
                </div>
                <input
                  type="number"
                  min="0"
                  value={building.surface_occupied || ''}
                  onChange={(e) => updateBuilding(index, 'surface_occupied', parseInt(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <div className="field-with-info">
                  <label>Réseau d'électricité</label>
                  <InfoTooltip 
                    formula="Facteur CO₂ : Standard=0.0571, Vert=0.0216, Auto=0 kg CO₂/kWh"
                    explanation="Type d'électricité impactant directement le facteur d'émission"
                  />
                </div>
                <select
                  value={building.electricity_network || ''}
                  onChange={(e) => updateBuilding(index, 'electricity_network', e.target.value)}
                >
                  <option value="">Sélectionner...</option>
                  <option value="standard">Standard</option>
                  <option value="vert">Vert</option>
                  <option value="autoproduction">Autoproduction</option>
                </select>
              </div>

              <div className="form-group">
                <div className="field-with-info">
                  <label>Consommation d'eau (m³/an)</label>
                  <InfoTooltip 
                    formula="Émissions CO₂ = Volume (m³) × 0.132 kg CO₂/m³"
                    explanation="Impact du traitement et distribution de l'eau selon facteur ADEME"
                  />
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={building.water_consumption || ''}
                  onChange={(e) => updateBuilding(index, 'water_consumption', parseFloat(e.target.value))}
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <div className="field-with-info">
                  <label>Usage du chauffage électrique</label>
                  <InfoTooltip 
                    formula="Multiplicateur d'émissions électriques selon usage"
                    explanation="Niveau d'utilisation du chauffage électrique (principal facteur de consommation)"
                  />
                </div>
                <select
                  value={building.electric_heating_usage || ''}
                  onChange={(e) => updateBuilding(index, 'electric_heating_usage', e.target.value)}
                >
                  <option value="">Sélectionner...</option>
                  <option value="aucun">Aucun</option>
                  <option value="partiel">Partiel</option>
                  <option value="principal">Principal</option>
                  <option value="total">Total</option>
                </select>
              </div>

              <div className="form-group">
                <div className="field-with-info">
                  <label>Réseau de chaleur</label>
                  <InfoTooltip 
                    formula="Facteur CO₂ réseau : 0.227 kg CO₂/kWh (moyenne France)"
                    explanation="Connexion au réseau de chauffage urbain avec facteur d'émission spécifique"
                  />
                </div>
                <select
                  value={building.heating_network || ''}
                  onChange={(e) => updateBuilding(index, 'heating_network', e.target.value)}
                >
                  <option value="">Sélectionner...</option>
                  <option value="non">Non</option>
                  <option value="oui">Oui</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <div className="field-with-info">
                  <label>Consommation de gaz naturel (kWh/an)</label>
                  <InfoTooltip 
                    formula="Émissions CO₂ = Consommation (kWh) × 0.227 kg CO₂/kWh"
                    explanation="Facteur d'émission ADEME pour gaz naturel (combustion + amont)"
                  />
                </div>
                <input
                  type="number"
                  min="0"
                  value={building.natural_gas_consumption || ''}
                  onChange={(e) => updateBuilding(index, 'natural_gas_consumption', parseInt(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <div className="field-with-info">
                  <label>Consommation de propane (kg/an)</label>
                  <InfoTooltip 
                    formula="Émissions CO₂ = Consommation (kg) × 2.98 kg CO₂/kg"
                    explanation="Facteur d'émission ADEME pour propane (combustion + amont)"
                  />
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={building.propane_consumption || ''}
                  onChange={(e) => updateBuilding(index, 'propane_consumption', parseFloat(e.target.value))}
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingsForm;