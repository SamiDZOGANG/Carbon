// Accessibility utility functions

/**
 * Generate unique IDs for form elements
 */
let idCounter = 0;
export const generateId = (prefix: string = 'id'): string => {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
};

/**
 * Create ARIA attributes for form groups
 */
export const createAriaAttributes = (
  id: string,
  isRequired: boolean = false,
  hasError: boolean = false,
  describedBy?: string
) => {
  const attributes: Record<string, string> = {
    id,
    'aria-required': isRequired.toString(),
  };
  
  if (hasError) {
    attributes['aria-invalid'] = 'true';
    attributes['aria-describedby'] = describedBy || `${id}-error`;
  } else if (describedBy) {
    attributes['aria-describedby'] = describedBy;
  }
  
  return attributes;
};

/**
 * Keyboard navigation handler
 */
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  callbacks: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
) => {
  const { key } = event;
  
  switch (key) {
    case 'Enter':
      callbacks.onEnter?.();
      break;
    case ' ':
      event.preventDefault();
      callbacks.onSpace?.();
      break;
    case 'Escape':
      callbacks.onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      callbacks.onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      callbacks.onArrowDown?.();
      break;
    case 'ArrowLeft':
      callbacks.onArrowLeft?.();
      break;
    case 'ArrowRight':
      callbacks.onArrowRight?.();
      break;
    default:
      break;
  }
};

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Set focus to the first focusable element
   */
  focusFirst: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    firstElement?.focus();
  },

  /**
   * Set focus to the last focusable element
   */
  focusLast: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    lastElement?.focus();
  },

  /**
   * Trap focus within a container
   */
  trapFocus: (container: HTMLElement, event: KeyboardEvent) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  },
};

/**
 * Screen reader announcements
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Color contrast utilities
 */
export const colorContrast = {
  /**
   * Check if color combination meets WCAG contrast requirements
   */
  meetsWCAG: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    // This is a simplified implementation
    // In a real application, you would use a proper color contrast library
    const thresholds = { AA: 4.5, AAA: 7 };
    return true; // Placeholder - implement actual contrast calculation
  },

  /**
   * Get accessible color suggestions
   */
  getSuggestedColors: (baseColor: string): string[] => {
    // Return accessible color variations
    return ['#003366', '#FFD100', '#ffffff', '#000000'];
  },
};

/**
 * ARIA live region utilities
 */
export const liveRegions = {
  /**
   * Create a live region for dynamic content updates
   */
  createLiveRegion: (id: string, priority: 'polite' | 'assertive' = 'polite'): HTMLElement => {
    let region = document.getElementById(id);
    
    if (!region) {
      region = document.createElement('div');
      region.id = id;
      region.setAttribute('aria-live', priority);
      region.setAttribute('aria-atomic', 'true');
      region.style.position = 'absolute';
      region.style.left = '-10000px';
      region.style.width = '1px';
      region.style.height = '1px';
      region.style.overflow = 'hidden';
      document.body.appendChild(region);
    }
    
    return region;
  },

  /**
   * Update live region content
   */
  updateLiveRegion: (id: string, message: string) => {
    const region = document.getElementById(id);
    if (region) {
      region.textContent = message;
    }
  },
};