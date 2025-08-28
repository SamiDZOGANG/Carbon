/**
 * Configuration globale de l'application
 * Version optimisée avec UX améliorée et fonctionnalités complètes
 * @version 2.0
 * @author La Poste - Équipe Développement GES
 */

export const CONFIG = {
  animationDelay: 150,
  scrollOffset: 100,
  mobileBreakpoint: 768,
  debounceDelay: 300,
  autoSaveDelay: 2000,
  maxRetries: 3,
  apiTimeout: 30000
};

export const COLORS = {
  primary: '#FFD100', // Jaune La Poste
  secondary: '#003366', // Bleu La Poste
  textDark: '#333',
  textLight: '#555',
  bgLight: '#f9f9f9',
  white: '#ffffff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8'
};

export const EMISSION_CATEGORIES = [
  'batiments',
  'flotte-propre',
  'transport-sous-traite',
  'deplacements-domicile',
  'deplacements-professionnels',
  'frequentation',
  'alimentation',
  'achats',
  'dechets'
] as const;

export type EmissionCategory = typeof EMISSION_CATEGORIES[number];