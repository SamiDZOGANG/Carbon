import React, { useState, useEffect } from 'react';
import './NotificationContainer.css';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Écouter les événements de notification personnalisés
    const handleNotification = (event: CustomEvent<Notification>) => {
      addNotification(event.detail);
    };

    window.addEventListener('show-notification' as any, handleNotification);
    return () => {
      window.removeEventListener('show-notification' as any, handleNotification);
    };
  }, []);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Supprimer automatiquement après la durée spécifiée
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <span className="notification-icon">
            {notification.type === 'success' && '✓'}
            {notification.type === 'error' && '✕'}
            {notification.type === 'warning' && '⚠'}
            {notification.type === 'info' && 'ℹ'}
          </span>
          <span className="notification-message">{notification.message}</span>
        </div>
      ))}
    </div>
  );
};

// Fonction utilitaire pour afficher une notification
export const showNotification = (
  message: string, 
  type: 'success' | 'error' | 'warning' | 'info' = 'info',
  duration: number = 5000
) => {
  const event = new CustomEvent('show-notification', {
    detail: { message, type, duration }
  });
  window.dispatchEvent(event);
};

export default NotificationContainer;