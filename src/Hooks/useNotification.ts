import { useState } from 'react';

type Severity = 'success' | 'danger';

const initialState = {
  open: false,
  severity: 'success' as Severity,
  title: '',
  message: '',
};

export function useNotification() {
  const [notification, setNotification] = useState(initialState);

  const hideNotification = () => {
    setNotification(initialState);
  };

  const showNotification = (severity: Severity, title: string, message: string) => {
    setNotification({
      open: true,
      severity,
      title,
      message,
    });
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
}