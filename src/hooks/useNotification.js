import { useState } from 'react';

function useNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    type: 'success',
    message: ''
  });

  // Hiển thị notification
  const notify = (type, message) => {
    setNotification({ type, message });
    setShowNotification(true);
  };

  // Đóng notification
  const closeNotification = () => {
    setShowNotification(false);
  };

  return {
    showNotification,
    notification,
    notify,
    closeNotification
  };
}

export default useNotification;
