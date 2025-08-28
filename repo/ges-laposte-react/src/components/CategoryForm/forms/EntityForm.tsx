import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

interface EntityFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const EntityForm: React.FC<EntityFormProps> = ({ data, onChange }) => {
  return (
    <div className="form-sections">
      <div className="form-section">
        <h3>Identification de l'entité</h3>
        
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="entity_name">
                Nom de l'entité
              </label>
              <InfoTooltip 
                formula="Dénomination officielle de l'entité"
                explanation="Nom de l'établissement, site ou entité faisant l'objet du bilan GES"
              />
            </div>
            <input
              type="text"
              id="entity_name"
              value={data.entity_name || ''}
              onChange={(e) => onChange('entity_name', e.target.value)}
              placeholder="Nom de l'entité"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="entity_type">
                Type d'entité
              </label>
              <InfoTooltip 
                formula="Catégorisation de l'activité"
                explanation="Type d'établissement La Poste, impacte les facteurs d'émission applicables"
              />
            </div>
            <select
              id="entity_type"
              value={data.entity_type || ''}
              onChange={(e) => onChange('entity_type', e.target.value)}
            >
              <option value="">Sélectionner...</option>
              <option value="centre-distribution">Centre de distribution</option>
              <option value="bureau-poste">Bureau de poste</option>
              <option value="plateforme-colis">Plateforme colis</option>
              <option value="direction-regionale">Direction régionale</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="regate_code">
                Code REGATE
              </label>
              <InfoTooltip 
                formula="Identifiant unique interne"
                explanation="Code d'identification La Poste pour traçabilité et gestion interne"
              />
            </div>
            <input
              type="text"
              id="regate_code"
              value={data.regate_code || ''}
              onChange={(e) => onChange('regate_code', e.target.value)}
              placeholder="Code REGATE"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="attachment_unit">
                Unité de rattachement
              </label>
              <InfoTooltip 
                formula="Hiérarchie organisationnelle"
                explanation="Direction ou région de rattachement de l'entité dans l'organigramme"
              />
            </div>
            <input
              type="text"
              id="attachment_unit"
              value={data.attachment_unit || ''}
              onChange={(e) => onChange('attachment_unit', e.target.value)}
              placeholder="Unité de rattachement"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Ressources humaines</h3>
        
        <div className="form-grid-2">
          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="internal_employees">
                Collaborateurs internes (CDD, CDI) - ETP
              </label>
              <InfoTooltip 
                formula="Nombre total d'ETP internes = Σ(temps de travail de chaque salarié / temps plein)"
                explanation="Les ETP incluent tous les contrats CDI et CDD convertis en équivalent temps plein"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="internal_employees"
              value={data.internal_employees || ''}
              onChange={(e) => onChange('internal_employees', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>

          <div className="form-group">
            <div className="field-with-info">
              <label htmlFor="external_employees">
                Collaborateurs externes (intérimaire, consultant, ...) - ETP
              </label>
              <InfoTooltip 
                formula="Nombre total d'ETP externes = Σ(temps de travail externes / temps plein)"
                explanation="Incluent intérimaires, consultants, prestataires de services travaillant sur site"
              />
            </div>
            <input
              type="number"
              step="0.1"
              min="0"
              id="external_employees"
              value={data.external_employees || ''}
              onChange={(e) => onChange('external_employees', parseFloat(e.target.value))}
              placeholder="0.0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityForm;