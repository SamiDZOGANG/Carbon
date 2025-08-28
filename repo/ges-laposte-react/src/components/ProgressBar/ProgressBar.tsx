import React from 'react';
import './ProgressBar.css';

interface Step {
  id: string;
  label: string;
  icon: string;
  description?: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepIndex: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  steps, 
  currentStep, 
  completedSteps,
  onStepClick 
}) => {
  const progressPercentage = ((completedSteps.length / steps.length) * 100).toFixed(0);

  const getStepStatus = (index: number) => {
    if (completedSteps.includes(index)) return 'completed';
    if (index === currentStep) return 'active';
    if (index < currentStep) return 'visited';
    return 'pending';
  };

  return (
    <div className="progress-container">
      {/* Barre de progression globale */}
      <div className="progress-header">
        <h3 className="progress-title">Progression de votre bilan GES</h3>
        <div className="progress-percentage">
          <span className="percentage-value">{progressPercentage}%</span>
          <span className="percentage-label">complété</span>
        </div>
      </div>

      {/* Barre de progression visuelle */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar-background">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Étapes */}
      <div className="progress-steps">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = status === 'completed' || status === 'visited' || status === 'active';
          
          return (
            <div key={step.id} className="step-wrapper">
              <div 
                className={`progress-step ${status}`}
                onClick={() => isClickable && onStepClick?.(index)}
                style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}
              >
                {/* Connecteur entre les étapes */}
                {index > 0 && (
                  <div className={`step-connector ${
                    completedSteps.includes(index - 1) ? 'completed' : ''
                  }`} />
                )}
                
                {/* Cercle de l'étape */}
                <div className="step-circle">
                  {status === 'completed' ? (
                    <span className="step-check">✓</span>
                  ) : (
                    <>
                      <span className="step-icon">{step.icon}</span>
                      <span className="step-number">{index + 1}</span>
                    </>
                  )}
                </div>
                
                {/* Informations de l'étape */}
                <div className="step-info">
                  <div className="step-label">{step.label}</div>
                  {step.description && (
                    <div className="step-description">{step.description}</div>
                  )}
                </div>

                {/* Badge de statut */}
                {status === 'active' && (
                  <div className="step-badge">En cours</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message d'encouragement */}
      <div className="progress-message">
        {progressPercentage === '100' ? (
          <p className="message-success">
            🎉 Félicitations ! Vous avez complété votre bilan GES !
          </p>
        ) : progressPercentage === '0' ? (
          <p className="message-info">
            👋 Commençons votre bilan carbone étape par étape
          </p>
        ) : (
          <p className="message-encouragement">
            💪 Continuez ainsi ! Plus que {steps.length - completedSteps.length} étape(s) à compléter
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;