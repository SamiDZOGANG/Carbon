import { useEffect, useCallback, useRef } from 'react';
import { debounce } from '../utils/helpers';
import { showNotification } from '../components/NotificationContainer/NotificationContainer';

interface AutoSaveData {
  currentStep?: number;
  completedSteps?: number[];
  availableCategories?: string[];
  formData?: Record<string, any>;
  lastSaved?: string;
}

const STORAGE_KEY = 'ges_progress';
const AUTO_SAVE_DELAY = 2000; // 2 secondes

export const useAutoSave = (data: AutoSaveData, enabled: boolean = true) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedDataRef = useRef<string>('');

  // Fonction de sauvegarde
  const saveData = useCallback(() => {
    if (!enabled) return;

    const dataToSave = {
      ...data,
      lastSaved: new Date().toISOString()
    };

    const serializedData = JSON.stringify(dataToSave);
    
    // Éviter de sauvegarder si les données n'ont pas changé
    if (serializedData === lastSavedDataRef.current) {
      return;
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, serializedData);
      lastSavedDataRef.current = serializedData;
      
      // Notification silencieuse (peut être désactivée)
      console.log('✅ Progression sauvegardée automatiquement');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showNotification('Erreur lors de la sauvegarde automatique', 'error');
    }
  }, [data, enabled]);

  // Sauvegarde avec debounce
  const debouncedSave = useCallback(
    debounce(saveData, AUTO_SAVE_DELAY),
    [saveData]
  );

  // Fonction de restauration
  const restoreData = useCallback((): AutoSaveData | null => {
    try {
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        showNotification('Progression restaurée depuis la dernière session', 'info');
        return parsed;
      }
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
    }
    return null;
  }, []);

  // Fonction de suppression
  const clearSavedData = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      lastSavedDataRef.current = '';
      showNotification('Données sauvegardées effacées', 'info');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }, []);

  // Fonction de sauvegarde manuelle
  const saveManually = useCallback(() => {
    saveData();
    showNotification('Progression sauvegardée !', 'success', 3000);
  }, [saveData]);

  // Auto-save quand les données changent
  useEffect(() => {
    if (enabled && data) {
      debouncedSave();
    }
  }, [data, enabled, debouncedSave]);

  // Sauvegarde avant de quitter la page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (enabled && data && Object.keys(data).length > 0) {
        saveData();
        
        // Message de confirmation si des données non sauvegardées
        const hasUnsavedData = JSON.stringify(data) !== lastSavedDataRef.current;
        if (hasUnsavedData) {
          e.preventDefault();
          e.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Sauvegarder une dernière fois au démontage
      if (enabled) {
        saveData();
      }
    };
  }, [data, enabled, saveData]);

  return {
    saveManually,
    restoreData,
    clearSavedData,
    lastSaved: data.lastSaved
  };
};

// Hook pour récupérer les données sauvegardées au chargement
export const useRestoreOnMount = () => {
  const restoredData = useRef<AutoSaveData | null>(null);

  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const lastSavedDate = new Date(parsed.lastSaved);
        const now = new Date();
        const hoursSinceLastSave = (now.getTime() - lastSavedDate.getTime()) / (1000 * 60 * 60);

        // Ne restaurer que si les données ont moins de 24 heures
        if (hoursSinceLastSave < 24) {
          restoredData.current = parsed;
          
          // Afficher un message avec le temps écoulé
          const timeAgo = formatTimeAgo(lastSavedDate);
          showNotification(
            `Session précédente trouvée (${timeAgo}). Continuer où vous vous êtes arrêté ?`,
            'info',
            5000
          );
        } else {
          // Données trop anciennes, les supprimer
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des données sauvegardées:', error);
    }
  }, []);

  return restoredData.current;
};

// Fonction utilitaire pour formater le temps écoulé
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 1) {
    return 'à l\'instant';
  } else if (diffMins < 60) {
    return `il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }
}

export default useAutoSave;