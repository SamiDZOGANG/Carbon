import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

interface FleetFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const FleetForm: React.FC<FleetFormProps> = ({ data, onChange }) => {
  return (
    <div className="form-sections">
      <div className="form-section">
        <h3>Flotte de véhicules postaux</h3>
        
        <div className="form-grid-4">
          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="velo">
                Vélos
                <small>Nombre</small>
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = 0 kg CO₂ (transport décarboné)"
                explanation="Vélos mécaniques de la flotte - aucune émission à l'usage"
              />
            </div>
            <input
              type="number"
              id="velo"
              value={data.velo || ''}
              onChange={(e) => onChange('velo', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="velo_elec">
                Vélos électriques
                <small>Nombre</small>
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Usage × 0.0057 kg CO₂/km"
                explanation="Vélos à assistance électrique - très faible impact"
              />
            </div>
            <input
              type="number"
              id="velo_elec"
              value={data.velo_elec || ''}
              onChange={(e) => onChange('velo_elec', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="staby">
                Staby
                <small>Nombre</small>
              </label>
              <InfoTooltip 
                formula="Émissions selon carburant utilisé"
                explanation="Véhicule triporteur La Poste - émissions selon motorisation"
              />
            </div>
            <input
              type="number"
              id="staby"
              value={data.staby || ''}
              onChange={(e) => onChange('staby', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="quadeo">
                Quadéo
                <small>Nombre</small>
              </label>
              <InfoTooltip 
                formula="Émissions selon carburant utilisé"
                explanation="Quadricycle La Poste - émissions selon motorisation"
              />
            </div>
            <input
              type="number"
              id="quadeo"
              value={data.quadeo || ''}
              onChange={(e) => onChange('quadeo', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="vh_leger">
                Véhicules légers
                <small>Nombre</small>
              </label>
              <InfoTooltip 
                formula="Émissions selon consommation carburant"
                explanation="Véhicules <3.5t - voitures et utilitaires légers"
              />
            </div>
            <input
              type="number"
              id="vh_leger"
              value={data.vh_leger || ''}
              onChange={(e) => onChange('vh_leger', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="vh_utilitaire">
                Véhicules utilitaires
                <small>Nombre</small>
              </label>
              <InfoTooltip 
                formula="Émissions selon consommation carburant"
                explanation="Véhicules utilitaires 3.5-19t"
              />
            </div>
            <input
              type="number"
              id="vh_utilitaire"
              value={data.vh_utilitaire || ''}
              onChange={(e) => onChange('vh_utilitaire', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="poids_lourd">
                Poids lourds
                <small>Nombre</small>
              </label>
              <InfoTooltip 
                formula="Émissions selon consommation carburant"
                explanation="Véhicules >19t - camions et semi-remorques"
              />
            </div>
            <input
              type="number"
              id="poids_lourd"
              value={data.poids_lourd || ''}
              onChange={(e) => onChange('poids_lourd', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Consommation de carburant</h3>
        
        <div className="form-grid-3">
          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="essence">
                Essence
                <small>Litres/an</small>
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.28 kg CO₂/L"
                explanation="Essence sans plomb - Facteur d'émission ADEME"
              />
            </div>
            <input
              type="number"
              id="essence"
              value={data.essence || ''}
              onChange={(e) => onChange('essence', parseFloat(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="diesel">
                Diesel
                <small>Litres/an</small>
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.51 kg CO₂/L"
                explanation="Gazole/Diesel - Facteur d'émission ADEME"
              />
            </div>
            <input
              type="number"
              id="diesel"
              value={data.diesel || ''}
              onChange={(e) => onChange('diesel', parseFloat(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="gnv">
                GNV
                <small>kg/an</small>
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (kg) × 2.16 kg CO₂/kg"
                explanation="Gaz naturel véhicule - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              id="gnv"
              value={data.gnv || ''}
              onChange={(e) => onChange('gnv', parseFloat(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="elec_kwh">
                Électricité véhicules
                <small>kWh/an</small>
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (kWh) × 0.0571 kg CO₂/kWh"
                explanation="Recharge véhicules électriques - mix électrique français"
              />
            </div>
            <input
              type="number"
              id="elec_kwh"
              value={data.elec_kwh || ''}
              onChange={(e) => onChange('elec_kwh', parseFloat(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group compact">
            <div className="field-with-info">
              <label htmlFor="hydrogene">
                Hydrogène
                <small>kg/an</small>
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (kg) × facteur production H₂"
                explanation="Hydrogène - émissions variables selon mode de production (gris/vert)"
              />
            </div>
            <input
              type="number"
              id="hydrogene"
              value={data.hydrogene || ''}
              onChange={(e) => onChange('hydrogene', parseFloat(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Kilométrage annuel</h3>
        <div className="form-group">
          <div className="field-with-info">
            <label htmlFor="km_total">Kilométrage total annuel</label>
            <InfoTooltip 
              formula="Base de calcul pour ratios et vérifications"
              explanation="Distance totale parcourue par la flotte - indicateur d'activité"
            />
          </div>
          <input
            type="number"
            id="km_total"
            value={data.km_total || ''}
            onChange={(e) => onChange('km_total', parseFloat(e.target.value))}
            placeholder="Kilomètres parcourus par an"
          />
        </div>
      </div>
    </div>
  );
};

export default FleetForm;