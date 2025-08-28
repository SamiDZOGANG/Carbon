import React, { useState } from 'react';

interface InfoTooltipProps {
  formula: string;
  explanation?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ formula, explanation }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="field-info-container">
      <button
        type="button"
        className="info-button"
        onClick={() => setIsVisible(!isVisible)}
        onBlur={() => setIsVisible(false)}
        aria-label="Voir la formule de calcul"
      >
        i
      </button>
      <div className={`formula-tooltip ${isVisible ? 'visible' : ''}`}>
        <strong>Formule de calcul :</strong>
        {formula}
        {explanation && (
          <>
            <br />
            <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>{explanation}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;