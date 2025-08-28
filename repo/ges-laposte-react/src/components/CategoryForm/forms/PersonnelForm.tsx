import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

interface PersonnelFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const PersonnelForm: React.FC<PersonnelFormProps> = ({ data, onChange }) => {
  return (
    <div className="form-sections">
      <div className="form-section">
        <h3>Organisation du travail</h3>
        
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="opening_days_per_week">
                Jours ouverture/sem.
              </label>
              <InfoTooltip 
                formula="Impact sur calcul des déplacements domicile-travail"
                explanation="Nombre de jours d'ouverture hebdomadaire, base du calcul de fréquence de déplacement"
              />
            </div>
            <select
              id="opening_days_per_week"
              value={data.opening_days_per_week || ''}
              onChange={(e) => onChange('opening_days_per_week', e.target.value)}
            >
              <option value="">Sélectionner...</option>
              <option value="5">5</option>
              <option value="5.5">5.5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="telework_1_day">
                Télétravail 1j/sem.
              </label>
              <InfoTooltip 
                formula="Réduction émissions = Nb collaborateurs × 1j/5j × émissions trajet"
                explanation="Collaborateurs en télétravail 1 jour/semaine - réduit les déplacements domicile-travail"
              />
            </div>
            <input
              type="number"
              min="0"
              id="telework_1_day"
              value={data.telework_1_day || ''}
              onChange={(e) => onChange('telework_1_day', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="telework_2_days">
                Télétravail 2j/sem.
              </label>
              <InfoTooltip 
                formula="Réduction émissions = Nb collaborateurs × 2j/5j × émissions trajet"
                explanation="Collaborateurs en télétravail 2 jours/semaine"
              />
            </div>
            <input
              type="number"
              min="0"
              id="telework_2_days"
              value={data.telework_2_days || ''}
              onChange={(e) => onChange('telework_2_days', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="telework_3_days">
                Télétravail 3j/sem.
              </label>
              <InfoTooltip 
                formula="Réduction émissions = Nb collaborateurs × 3j/5j × émissions trajet"
                explanation="Collaborateurs en télétravail 3 jours/semaine"
              />
            </div>
            <input
              type="number"
              min="0"
              id="telework_3_days"
              value={data.telework_3_days || ''}
              onChange={(e) => onChange('telework_3_days', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="telework_4_days">
                Télétravail 4j/sem.
              </label>
              <InfoTooltip 
                formula="Réduction émissions = Nb collaborateurs × 4j/5j × émissions trajet"
                explanation="Collaborateurs en télétravail 4 jours/semaine"
              />
            </div>
            <input
              type="number"
              min="0"
              id="telework_4_days"
              value={data.telework_4_days || ''}
              onChange={(e) => onChange('telework_4_days', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="telework_5_days">
                Télétravail 5j/sem.
              </label>
              <InfoTooltip 
                formula="Réduction émissions = Nb collaborateurs × 100% × émissions trajet"
                explanation="Collaborateurs en télétravail complet (5 jours/semaine)"
              />
            </div>
            <input
              type="number"
              min="0"
              id="telework_5_days"
              value={data.telework_5_days || ''}
              onChange={(e) => onChange('telework_5_days', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Déplacements domicile-travail</h3>
        
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="car_commuters">
                Collaborateurs utilisant une voiture
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb collaborateurs × distance domicile-travail × 0.193 kg CO₂/km"
                explanation="Facteur ADEME pour voiture particulière thermique moyenne"
              />
            </div>
            <input
              type="number"
              min="0"
              id="car_commuters"
              value={data.car_commuters || ''}
              onChange={(e) => onChange('car_commuters', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="public_transport_commuters">
                Collaborateurs utilisant les transports en commun
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Nb collaborateurs × distance × 0.103 kg CO₂/km (métro)"
                explanation="Facteurs ADEME variables selon type : bus, métro, tramway, RER"
              />
            </div>
            <input
              type="number"
              min="0"
              id="public_transport_commuters"
              value={data.public_transport_commuters || ''}
              onChange={(e) => onChange('public_transport_commuters', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Déplacements professionnels</h3>
        
        <div className="form-group">
          <div className="field-with-info">
            <label htmlFor="client_visits">
              Visites clients
            </label>
            <InfoTooltip 
              formula="Émissions CO₂ = Nb visites × distance moyenne × facteur transport"
              explanation="Nombre de visites clients annuelles, génère des déplacements professionnels"
            />
          </div>
          <input
            type="number"
            min="0"
            id="client_visits"
            value={data.client_visits || ''}
            onChange={(e) => onChange('client_visits', parseInt(e.target.value))}
            placeholder="0"
          />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="short_flight_km">
                Avion court (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.258 kg CO₂/km.passager"
                explanation="Vols domestiques et court-courriers (<1000km) - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="short_flight_km"
              value={data.short_flight_km || ''}
              onChange={(e) => onChange('short_flight_km', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="medium_flight_km">
                Avion moyen (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.187 kg CO₂/km.passager"
                explanation="Vols moyen-courriers (1000-3000km) - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="medium_flight_km"
              value={data.medium_flight_km || ''}
              onChange={(e) => onChange('medium_flight_km', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="long_flight_km">
                Avion long (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.152 kg CO₂/km.passager"
                explanation="Vols long-courriers (>3000km) - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="long_flight_km"
              value={data.long_flight_km || ''}
              onChange={(e) => onChange('long_flight_km', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="train_km">
                Train (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.014 kg CO₂/km.passager"
                explanation="TGV et trains électriques - Facteur ADEME (transport peu carbonné)"
              />
            </div>
            <input
              type="number"
              min="0"
              id="train_km"
              value={data.train_km || ''}
              onChange={(e) => onChange('train_km', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Mobilité douce et complémentaire</h3>
        
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="vae_distance_km">
                Distance parcourue en VAE (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.0057 kg CO₂/km"
                explanation="Vélo à assistance électrique - très faible impact carbone"
              />
            </div>
            <input
              type="number"
              min="0"
              id="vae_distance_km"
              value={data.vae_distance_km || ''}
              onChange={(e) => onChange('vae_distance_km', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="bike_users">
                Collaborateurs utilisant un vélo
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = 0 kg CO₂ (transport décarboné)"
                explanation="Vélo mécanique - aucune émission directe de CO₂"
              />
            </div>
            <input
              type="number"
              min="0"
              id="bike_users"
              value={data.bike_users || ''}
              onChange={(e) => onChange('bike_users', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="walking_users">
                Collaborateurs se déplaçant à pied
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = 0 kg CO₂ (transport décarboné)"
                explanation="Déplacement à pied - aucune émission de CO₂"
              />
            </div>
            <input
              type="number"
              min="0"
              id="walking_users"
              value={data.walking_users || ''}
              onChange={(e) => onChange('walking_users', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="public_transport_distance">
                Distance transport en commun (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × facteur selon type de transport"
                explanation="Bus: 0.166, Métro: 0.103, Tramway: 0.044 kg CO₂/km.passager"
              />
            </div>
            <input
              type="number"
              min="0"
              id="public_transport_distance"
              value={data.public_transport_distance || ''}
              onChange={(e) => onChange('public_transport_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="intercity_bus_distance">
                Distance autocar intercités (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.166 kg CO₂/km.passager"
                explanation="Autocar longue distance - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="intercity_bus_distance"
              value={data.intercity_bus_distance || ''}
              onChange={(e) => onChange('intercity_bus_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="ferry_distance">
                Distance parcourue en ferry (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.113 kg CO₂/km.passager"
                explanation="Ferry passagers - Facteur ADEME (transport maritime)"
              />
            </div>
            <input
              type="number"
              min="0"
              id="ferry_distance"
              value={data.ferry_distance || ''}
              onChange={(e) => onChange('ferry_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="thermal_car_distance">
                Distance voiture thermique (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.193 kg CO₂/km"
                explanation="Voiture thermique particulière moyenne - Facteur ADEME"
              />
            </div>
            <input
              type="number"
              min="0"
              id="thermal_car_distance"
              value={data.thermal_car_distance || ''}
              onChange={(e) => onChange('thermal_car_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="hybrid_car_distance">
                Distance voiture hybride (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.146 kg CO₂/km"
                explanation="Voiture hybride - Réduction d'émissions par rapport au thermique"
              />
            </div>
            <input
              type="number"
              min="0"
              id="hybrid_car_distance"
              value={data.hybrid_car_distance || ''}
              onChange={(e) => onChange('hybrid_car_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="electric_car_distance">
                Distance voiture électrique (km/an)
              </label>
              <InfoTooltip 
                formula="Émissions CO₂ = Distance (km) × 0.0571 kg CO₂/km"
                explanation="Voiture électrique - Facteur électricité française"
              />
            </div>
            <input
              type="number"
              min="0"
              id="electric_car_distance"
              value={data.electric_car_distance || ''}
              onChange={(e) => onChange('electric_car_distance', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonnelForm;