import React from 'react';
import './CategorySelector.css';

interface CategorySelectorProps {
  category: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ category, isSelected, onClick }) => {
  return (
    <div 
      className={`category-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="category-icon">{category.icon}</div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-description">{category.description}</p>
      {isSelected && (
        <div className="category-badge">
          <span>✓ Sélectionné</span>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;