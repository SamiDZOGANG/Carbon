import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EmissionCategory } from '../config/constants';
import { prefersReducedMotion } from '../utils/helpers';

interface NavigationState {
  isMobileMenuOpen: boolean;
  activeSection: string | null;
  isScrolled: boolean;
}

interface UIState {
  currentTheme: 'light' | 'dark';
  animationsEnabled: boolean;
  reducedMotion: boolean;
}

interface FormsState {
  selectedCategories: Set<EmissionCategory>;
  formData: Record<string, any>;
  validationErrors: Record<string, string>;
  isDirty: boolean;
}

interface AppStateType {
  navigation: NavigationState;
  ui: UIState;
  forms: FormsState;
  app: {
    isLoading: boolean;
    lastSaved: Date | null;
    version: string;
  };
}

interface AppContextType {
  state: AppStateType;
  updateNavigation: (updates: Partial<NavigationState>) => void;
  updateUI: (updates: Partial<UIState>) => void;
  updateForms: (updates: Partial<FormsState>) => void;
  toggleMobileMenu: () => void;
  selectCategory: (category: EmissionCategory) => void;
  deselectCategory: (category: EmissionCategory) => void;
  saveFormData: (data: Record<string, any>) => void;
  setLoading: (isLoading: boolean) => void;
}

const initialState: AppStateType = {
  navigation: {
    isMobileMenuOpen: false,
    activeSection: null,
    isScrolled: false
  },
  ui: {
    currentTheme: 'light',
    animationsEnabled: true,
    reducedMotion: false
  },
  forms: {
    selectedCategories: new Set(),
    formData: {},
    validationErrors: {},
    isDirty: false
  },
  app: {
    isLoading: false,
    lastSaved: null,
    version: '2.0'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppStateType>(initialState);

  useEffect(() => {
    // Détecter les préférences utilisateur
    const reducedMotion = prefersReducedMotion();
    updateUI({
      reducedMotion,
      animationsEnabled: !reducedMotion
    });

    // Charger les données sauvegardées depuis sessionStorage
    const savedData = sessionStorage.getItem('ges_form_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        updateForms({ formData: parsedData });
      } catch (error) {
        console.error('Erreur lors du chargement des données sauvegardées:', error);
      }
    }

    // Gérer l'événement de scroll
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      updateNavigation({ isScrolled });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateNavigation = (updates: Partial<NavigationState>) => {
    setState(prev => ({
      ...prev,
      navigation: { ...prev.navigation, ...updates }
    }));
  };

  const updateUI = (updates: Partial<UIState>) => {
    setState(prev => ({
      ...prev,
      ui: { ...prev.ui, ...updates }
    }));
  };

  const updateForms = (updates: Partial<FormsState>) => {
    setState(prev => ({
      ...prev,
      forms: { ...prev.forms, ...updates }
    }));
  };

  const toggleMobileMenu = () => {
    setState(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        isMobileMenuOpen: !prev.navigation.isMobileMenuOpen
      }
    }));
  };

  const selectCategory = (category: EmissionCategory) => {
    setState(prev => {
      const newCategories = new Set(prev.forms.selectedCategories);
      newCategories.add(category);
      return {
        ...prev,
        forms: {
          ...prev.forms,
          selectedCategories: newCategories
        }
      };
    });
  };

  const deselectCategory = (category: EmissionCategory) => {
    setState(prev => {
      const newCategories = new Set(prev.forms.selectedCategories);
      newCategories.delete(category);
      return {
        ...prev,
        forms: {
          ...prev.forms,
          selectedCategories: newCategories
        }
      };
    });
  };

  const saveFormData = (data: Record<string, any>) => {
    setState(prev => ({
      ...prev,
      forms: {
        ...prev.forms,
        formData: { ...prev.forms.formData, ...data },
        isDirty: true
      },
      app: {
        ...prev.app,
        lastSaved: new Date()
      }
    }));

    // Sauvegarder dans sessionStorage
    sessionStorage.setItem('ges_form_data', JSON.stringify({ ...state.forms.formData, ...data }));
  };

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({
      ...prev,
      app: {
        ...prev.app,
        isLoading
      }
    }));
  };

  const value: AppContextType = {
    state,
    updateNavigation,
    updateUI,
    updateForms,
    toggleMobileMenu,
    selectCategory,
    deselectCategory,
    saveFormData,
    setLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};