import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

interface TransportFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const TransportForm: React.FC<TransportFormProps> = ({ data, onChange }) => {
  return (
    <div className="form-sections">
      <div className="form-section">
        <h3>Description des véhicules de l'établissement</h3>
        
        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="diesel_fleet">
                Gazole (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.51 kg CO₂/L"
                explanation="Facteur d'émission ADEME pour gazole véhicule léger"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="diesel_fleet"
              value={data.diesel_fleet || ''}
              onChange={(e) => onChange('diesel_fleet', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="petrol_fleet">
                Essence SP (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.28 kg CO₂/L"
                explanation="Facteur d'émission ADEME pour essence sans plomb"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="petrol_fleet"
              value={data.petrol_fleet || ''}
              onChange={(e) => onChange('petrol_fleet', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="motorcycle_petrol">
                Motos thermiques - Essence (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.35 kg CO₂/L"
                explanation="Facteur d'émission ADEME pour motos et cyclomoteurs essence"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="motorcycle_petrol"
              value={data.motorcycle_petrol || ''}
              onChange={(e) => onChange('motorcycle_petrol', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="hvo_fleet">
                HVO (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 0.25 kg CO₂/L"
                explanation="Huile végétale hydrotraitée - carburant de synthèse faible émission"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="hvo_fleet"
              value={data.hvo_fleet || ''}
              onChange={(e) => onChange('hvo_fleet', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="lng_fleet">
                GNL (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (kg) × 2.16 kg CO₂/kg"
                explanation="Gaz naturel liquéfié - facteur d'émission ADEME"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="lng_fleet"
              value={data.lng_fleet || ''}
              onChange={(e) => onChange('lng_fleet', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="electric_distance">
                Distance véhicule électrique (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.0571 kg CO₂/km"
                explanation="Facteur d'émission ADEME pour électricité française (véhicule électrique)"
              />
            </div>
            <input
              type="number"
              min="0"
              id="electric_distance"
              value={data.electric_distance || ''}
              onChange={(e) => onChange('electric_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="bike_distance">
                Distance vélos mécaniques (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = 0 kg CO₂ (transport décarboné)"
                explanation="Les vélos mécaniques n'émettent pas de CO₂ à l'usage"
              />
            </div>
            <input
              type="number"
              min="0"
              id="bike_distance"
              value={data.bike_distance || ''}
              onChange={(e) => onChange('bike_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Nouvelle section Encadrement de l'activité */}
      <div className="form-section">
        <h3>Encadrement de l'activité</h3>
        
        <div className="form-group">
          <div className="field-with-info">
            <label htmlFor="mail_count">
              Tonnage courrier traité (nombre de courrier/an)
            </label>
            <InfoTooltip 
              formula="Émissions CO₂ = Nb courriers × 40 × 10⁻⁶ kg CO₂/courrier"
              explanation="Calcul basé sur un poids moyen de 40g par courrier"
            />
          </div>
          <input
            type="number"
            min="0"
            id="mail_count"
            value={data.mail_count || ''}
            onChange={(e) => onChange('mail_count', parseInt(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Transport sous-traité</h3>
        
        <div className="form-group">
          <div className="field-with-info">
            <label htmlFor="subcontracted_distance">
              Distance totale couverte par des prestataires (km/an)
            </label>
            <InfoTooltip 
              formula="Émissions CO₂ = Distance (km) × facteur selon type véhicule"
              explanation="Transport sous-traité - Scope 3 du bilan carbone"
            />
          </div>
          <input
            type="number"
            min="0"
            id="subcontracted_distance"
            value={data.subcontracted_distance || ''}
            onChange={(e) => onChange('subcontracted_distance', parseInt(e.target.value))}
            placeholder="0"
          />
        </div>

        <h4>Semi-remorque</h4>
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="semitrailer_diesel">
                Gazole B7 (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.51 kg CO₂/L"
                explanation="Gazole B7 pour semi-remorques - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="semitrailer_diesel"
              value={data.semitrailer_diesel || ''}
              onChange={(e) => onChange('semitrailer_diesel', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="semitrailer_lng">
                GNL (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (kg) × 2.16 kg CO₂/kg"
                explanation="Gaz naturel liquéfié semi-remorques - carburant alternatif"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="semitrailer_lng"
              value={data.semitrailer_lng || ''}
              onChange={(e) => onChange('semitrailer_lng', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="semitrailer_biocng">
                BioGNC (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (kg) × 0.44 kg CO₂/kg"
                explanation="BioGNC - gaz naturel comprimé biosourcé (faible émission)"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="semitrailer_biocng"
              value={data.semitrailer_biocng || ''}
              onChange={(e) => onChange('semitrailer_biocng', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="semitrailer_b100">
                B100 (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 0.39 kg CO₂/L"
                explanation="Biodiesel pur B100 - carburant renouvelable (faible émission)"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="semitrailer_b100"
              value={data.semitrailer_b100 || ''}
              onChange={(e) => onChange('semitrailer_b100', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="semitrailer_hvo">
                HVO (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 0.25 kg CO₂/L"
                explanation="HVO semi-remorques - huile végétale hydrotraitee"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="semitrailer_hvo"
              value={data.semitrailer_hvo || ''}
              onChange={(e) => onChange('semitrailer_hvo', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>

        <h4>Autres véhicules</h4>
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="carrier_diesel">
                Porteur (9-24t) - Gazole B7 (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.51 kg CO₂/L"
                explanation="Véhicule porteur 9-24 tonnes - transport intermdiaire"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="carrier_diesel"
              value={data.carrier_diesel || ''}
              onChange={(e) => onChange('carrier_diesel', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="vul_diesel">
                VUL - Gazole B7 (L/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Consommation (L) × 2.51 kg CO₂/L"
                explanation="Véhicule utilitaire léger <3.5t - transport de proximité"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="vul_diesel"
              value={data.vul_diesel || ''}
              onChange={(e) => onChange('vul_diesel', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportForm;