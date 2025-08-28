import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

interface IdentificationFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const IdentificationForm: React.FC<IdentificationFormProps> = ({ data, onChange, errors = {} }) => {
  return (
    <div className="form-sections">
      <div className="form-section">
        <h3>Informations du bilan</h3>
        
        <div className="form-grid-4">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="bilan_ges_number">
                Bilan GES N° *
              </label>
              <InfoTooltip 
                formula="Identifiant unique du bilan"
                explanation="Numéro d'identification unique pour traçabilité et suivi du bilan GES"
              />
            </div>
            <input
              type="text"
              id="bilan_ges_number"
              value={data.bilan_ges_number || ''}
              onChange={(e) => onChange('bilan_ges_number', e.target.value)}
              placeholder="Numéro du bilan"
              className={errors.bilan_ges_number ? 'error' : ''}
            />
            {errors.bilan_ges_number && (
              <span className="error-message">{errors.bilan_ges_number}</span>
            )}
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="creation_date">
                Date de création du bilan *
              </label>
              <InfoTooltip 
                formula="Date d'initialisation du bilan"
                explanation="Date de début de la collecte de données pour le bilan GES"
              />
            </div>
            <input
              type="date"
              id="creation_date"
              value={data.creation_date || ''}
              onChange={(e) => onChange('creation_date', e.target.value)}
              className={errors.creation_date ? 'error' : ''}
            />
            {errors.creation_date && (
              <span className="error-message">{errors.creation_date}</span>
            )}
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="report_year">
                Bilan sur l'année
              </label>
              <InfoTooltip 
                formula="Période de référence du bilan"
                explanation="Année civile de référence pour la collecte des données d'émissions"
              />
            </div>
            <select
              id="report_year"
              value={data.report_year || ''}
              onChange={(e) => onChange('report_year', e.target.value)}
            >
              <option value="">Sélectionner...</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="last_update">
                Dernière mise à jour
              </label>
              <InfoTooltip 
                formula="Traçabilité des modifications"
                explanation="Date et heure de la dernière modification des données du bilan"
              />
            </div>
            <input
              type="datetime-local"
              id="last_update"
              value={data.last_update || ''}
              onChange={(e) => onChange('last_update', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Auteur / Responsable</h3>
        
        <div className="form-grid-3">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="author_lastname">
                Nom
              </label>
              <InfoTooltip 
                formula="Identification du responsable"
                explanation="Nom du responsable ou référent du bilan GES"
              />
            </div>
            <input
              type="text"
              id="author_lastname"
              value={data.author_lastname || ''}
              onChange={(e) => onChange('author_lastname', e.target.value)}
              placeholder="Nom de famille"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="author_firstname">
                Prénom
              </label>
              <InfoTooltip 
                formula="Identification du responsable"
                explanation="Prénom du responsable ou référent du bilan GES"
              />
            </div>
            <input
              type="text"
              id="author_firstname"
              value={data.author_firstname || ''}
              onChange={(e) => onChange('author_firstname', e.target.value)}
              placeholder="Prénom"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="author_email">
                Adresse électronique
              </label>
              <InfoTooltip 
                formula="Contact du responsable"
                explanation="Email de contact pour toute question relative au bilan GES"
              />
            </div>
            <input
              type="email"
              id="author_email"
              value={data.author_email || ''}
              onChange={(e) => onChange('author_email', e.target.value)}
              placeholder="adresse@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentificationForm;