import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

const PurchasesForm: React.FC<{ data: any; onChange: (field: string, value: any) => void }> = ({ data, onChange }) => (
  <div className="form-sections">
    <div className="form-section">
      <h3>Achats et consommables</h3>
      <div className="form-grid-3">
        <div className="form-group compact">
          <div className="field-with-info">
            <label>Papier <small>(tonnes/an)</small></label>
            <InfoTooltip 
              formula="Émissions CO₂ = Poids (t) × 1.84 t CO₂/t"
              explanation="Consommation de papier - impression, copies, etc."
            />
          </div>
          <input type="number" value={data.paper || ''} onChange={(e) => onChange('paper', parseFloat(e.target.value))} />
        </div>
        <div className="form-group compact">
          <div className="field-with-info">
            <label>Matériel informatique <small>(unités/an)</small></label>
            <InfoTooltip 
              formula="Émissions CO₂ = Nb unités × facteur selon type équipement"
              explanation="Ordinateurs, imprimantes, écrans - impact fabrication"
            />
          </div>
          <input type="number" value={data.it_equipment || ''} onChange={(e) => onChange('it_equipment', parseInt(e.target.value))} />
        </div>
        <div className="form-group compact">
          <div className="field-with-info">
            <label>Fournitures <small>(€/an)</small></label>
            <InfoTooltip 
              formula="Émissions CO₂ = Montant (€) × 0.52 kg CO₂/€"
              explanation="Fournitures de bureau diverses - Facteur monétaire ADEME"
            />
          </div>
          <input type="number" value={data.supplies || ''} onChange={(e) => onChange('supplies', parseFloat(e.target.value))} />
        </div>
      </div>
    </div>
  </div>
);

export default PurchasesForm;