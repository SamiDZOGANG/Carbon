import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

interface PurchasesAndWasteFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const PurchasesAndWasteForm: React.FC<PurchasesAndWasteFormProps> = ({ data, onChange }) => {
  return (
    <div className="form-sections">
      <div className="form-section">
        <h3>Achats - Bureau</h3>
        
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="stationery_kg">
                Papeterie (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 1.84 kg CO₂/kg"
                explanation="Articles de papeterie - Facteur ADEME pour fournitures bureau"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="stationery_kg"
              value={data.stationery_kg || ''}
              onChange={(e) => onChange('stationery_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="new_cardboard_kg">
                Carton neuf (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.95 kg CO₂/kg"
                explanation="Carton d'emballage neuf - impact production"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="new_cardboard_kg"
              value={data.new_cardboard_kg || ''}
              onChange={(e) => onChange('new_cardboard_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="recycled_cardboard_kg">
                Carton recyclé (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.45 kg CO₂/kg"
                explanation="Carton recyclé - impact réduit par rapport au neuf"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="recycled_cardboard_kg"
              value={data.recycled_cardboard_kg || ''}
              onChange={(e) => onChange('recycled_cardboard_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="paper_kg">
                Papier (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 1.84 kg CO₂/kg"
                explanation="Consommation de papier - impression, copies, etc."
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="paper_kg"
              value={data.paper_kg || ''}
              onChange={(e) => onChange('paper_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Consommables bureautiques</h3>
        
        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="ink_euros">
                Encres (€/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Montant (€) × 0.52 kg CO₂/€"
                explanation="Cartouches d'encre imprimante - Facteur monétaire ADEME"
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="ink_euros"
              value={data.ink_euros || ''}
              onChange={(e) => onChange('ink_euros', parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="toners_euros">
                Toners (€/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Montant (€) × 0.52 kg CO₂/€"
                explanation="Toners pour imprimantes laser - Facteur monétaire ADEME"
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="toners_euros"
              value={data.toners_euros || ''}
              onChange={(e) => onChange('toners_euros', parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="cartridges_euros">
                Cartouches (€/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Montant (€) × 0.52 kg CO₂/€"
                explanation="Cartouches d'impression diverses - Facteur monétaire ADEME"
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="cartridges_euros"
              value={data.cartridges_euros || ''}
              onChange={(e) => onChange('cartridges_euros', parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Autres achats</h3>
        
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="vehicles_kg">
                Véhicules (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × facteur selon type véhicule"
                explanation="Achat/renouvellement véhicules - impact fabrication"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="vehicles_kg"
              value={data.vehicles_kg || ''}
              onChange={(e) => onChange('vehicles_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="machines_euros">
                Machines (€/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Montant (€) × 0.54 kg CO₂/€"
                explanation="Équipements et machines - Facteur monétaire ADEME"
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="machines_euros"
              value={data.machines_euros || ''}
              onChange={(e) => onChange('machines_euros', parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="textiles_euros">
                Textiles (€/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Montant (€) × 1.23 kg CO₂/€"
                explanation="Vêtements de travail, uniformes - Facteur monétaire ADEME"
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="textiles_euros"
              value={data.textiles_euros || ''}
              onChange={(e) => onChange('textiles_euros', parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="furniture_euros">
                Meubles (€/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Montant (€) × 0.41 kg CO₂/€"
                explanation="Mobilier de bureau - Facteur monétaire ADEME"
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="furniture_euros"
              value={data.furniture_euros || ''}
              onChange={(e) => onChange('furniture_euros', parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="publishing_euros">
                Édition (€/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Montant (€) × 0.78 kg CO₂/€"
                explanation="Services d'édition, impression - Facteur monétaire ADEME"
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="publishing_euros"
              value={data.publishing_euros || ''}
              onChange={(e) => onChange('publishing_euros', parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Restauration</h3>
        
        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="average_meals">
                Repas moyens
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb repas × 5.14 kg CO₂/repas"
                explanation="Repas type mixte (viande, légumes) - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="average_meals"
              value={data.average_meals || ''}
              onChange={(e) => onChange('average_meals', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="vegan_meals">
                Repas végétaliens
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb repas × 0.51 kg CO₂/repas"
                explanation="Repas sans produit animal - très faible impact carbone"
              />
            </div>
            <input
              type="number"
              min="0"
              id="vegan_meals"
              value={data.vegan_meals || ''}
              onChange={(e) => onChange('vegan_meals', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="vegetarian_meals">
                Repas végétariens
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb repas × 1.42 kg CO₂/repas"
                explanation="Repas sans viande (avec produits laitiers/œufs)"
              />
            </div>
            <input
              type="number"
              min="0"
              id="vegetarian_meals"
              value={data.vegetarian_meals || ''}
              onChange={(e) => onChange('vegetarian_meals', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="white_meat_meals">
                Repas viande blanche
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb repas × 4.15 kg CO₂/repas"
                explanation="Repas avec volaille, porc - impact modéré"
              />
            </div>
            <input
              type="number"
              min="0"
              id="white_meat_meals"
              value={data.white_meat_meals || ''}
              onChange={(e) => onChange('white_meat_meals', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="red_meat_meals">
                Repas viande rouge
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb repas × 7.26 kg CO₂/repas"
                explanation="Repas avec bœuf, agneau - fort impact carbone"
              />
            </div>
            <input
              type="number"
              min="0"
              id="red_meat_meals"
              value={data.red_meat_meals || ''}
              onChange={(e) => onChange('red_meat_meals', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="fish_meals">
                Repas poisson
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb repas × 3.75 kg CO₂/repas"
                explanation="Repas avec poisson - impact variable selon espèce et origine"
              />
            </div>
            <input
              type="number"
              min="0"
              id="fish_meals"
              value={data.fish_meals || ''}
              onChange={(e) => onChange('fish_meals', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Déchets</h3>
        
        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="plastic_waste_kg">
                Plastiques (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.021 kg CO₂/kg (si recyclé)"
                explanation="Déchets plastiques - impact selon mode de traitement"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="plastic_waste_kg"
              value={data.plastic_waste_kg || ''}
              onChange={(e) => onChange('plastic_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="glass_waste_kg">
                Verre (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.021 kg CO₂/kg (si recyclé)"
                explanation="Déchets de verre - facilement recyclable"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="glass_waste_kg"
              value={data.glass_waste_kg || ''}
              onChange={(e) => onChange('glass_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="furniture_waste_kg">
                Ameublement (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × facteur selon matériau"
                explanation="Déchets de mobilier - bois, métal, plastique"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="furniture_waste_kg"
              value={data.furniture_waste_kg || ''}
              onChange={(e) => onChange('furniture_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="textile_waste_kg">
                Textiles (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.467 kg CO₂/kg (si incinéré)"
                explanation="Déchets textiles - vêtements, tissus"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="textile_waste_kg"
              value={data.textile_waste_kg || ''}
              onChange={(e) => onChange('textile_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="wood_waste_kg">
                Bois (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.021 kg CO₂/kg (si recyclé)"
                explanation="Déchets de bois - palettes, mobilier, emballages"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="wood_waste_kg"
              value={data.wood_waste_kg || ''}
              onChange={(e) => onChange('wood_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="metal_waste_kg">
                Métaux (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.021 kg CO₂/kg (si recyclé)"
                explanation="Déchets métalliques - excellent potentiel de recyclage"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="metal_waste_kg"
              value={data.metal_waste_kg || ''}
              onChange={(e) => onChange('metal_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="mineral_waste_kg">
                Minérale/plâtre (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.021 kg CO₂/kg"
                explanation="Déchets minéraux - gravats, plâtre, céramique"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="mineral_waste_kg"
              value={data.mineral_waste_kg || ''}
              onChange={(e) => onChange('mineral_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="eee_waste_kg">
                EEE (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.021 kg CO₂/kg (si recyclé)"
                explanation="Déchets d'équipements électriques et électroniques - recyclés via filières spécialisées"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="eee_waste_kg"
              value={data.eee_waste_kg || ''}
              onChange={(e) => onChange('eee_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="household_waste_kg">
                Ordures ménagères (kg/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Poids (kg) × 0.467 kg CO₂/kg"
                explanation="Déchets non triés - incinération ou enfouissement"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="household_waste_kg"
              value={data.household_waste_kg || ''}
              onChange={(e) => onChange('household_waste_kg', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Informatique / Numérique</h3>
        
        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="laptop_units">
                PC portable (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 300 kg CO₂/unité"
                explanation="Impact fabrication ordinateur portable - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="laptop_units"
              value={data.laptop_units || ''}
              onChange={(e) => onChange('laptop_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="desktop_units">
                PC fixe (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 169 kg CO₂/unité"
                explanation="Impact fabrication ordinateur fixe - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="desktop_units"
              value={data.desktop_units || ''}
              onChange={(e) => onChange('desktop_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="screen_units">
                Écrans (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 248 kg CO₂/unité"
                explanation="Impact fabrication écran informatique - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="screen_units"
              value={data.screen_units || ''}
              onChange={(e) => onChange('screen_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="smartphone_units">
                Smartphones (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 39.1 kg CO₂/unité"
                explanation="Impact fabrication smartphone - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="smartphone_units"
              value={data.smartphone_units || ''}
              onChange={(e) => onChange('smartphone_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="projector_units">
                Vidéoprojecteur (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 94 kg CO₂/unité"
                explanation="Impact fabrication vidéoprojecteur - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="projector_units"
              value={data.projector_units || ''}
              onChange={(e) => onChange('projector_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="tv_units">
                Télévision (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 371 kg CO₂/unité"
                explanation="Impact fabrication télévision - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="tv_units"
              value={data.tv_units || ''}
              onChange={(e) => onChange('tv_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="inkjet_printer_units">
                Imp. jet encre (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 88 kg CO₂/unité"
                explanation="Impact fabrication imprimante jet d'encre - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="inkjet_printer_units"
              value={data.inkjet_printer_units || ''}
              onChange={(e) => onChange('inkjet_printer_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="laser_printer_units">
                Imp. laser (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 88 kg CO₂/unité"
                explanation="Impact fabrication imprimante laser - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="laser_printer_units"
              value={data.laser_printer_units || ''}
              onChange={(e) => onChange('laser_printer_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="multifunction_printer_units">
                Imp. multifonction (unités/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb unités × 88 kg CO₂/unité"
                explanation="Impact fabrication imprimante multifonction - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="multifunction_printer_units"
              value={data.multifunction_printer_units || ''}
              onChange={(e) => onChange('multifunction_printer_units', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasesAndWasteForm;