import './NotificationModal.css';

function NotificationModal({ isOpen, onClose, type, message }) {
  // Nếu không mở thì không hiển thị
  if (!isOpen) return null;
  
  // Icon theo loại thông báo
  const icon = type === 'success' ? '✓' : '✕';
  const iconClass = type === 'success' ? 'icon-success' : 'icon-error';
  
  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-content" onClick={(e) => e.stopPropagation()}>
        {/* Icon */}
        <div className={`notification-icon ${iconClass}`}>
          {icon}
        </div>
        
        {/* Message */}
        <h3 className="notification-title">
          {type === 'success' ? 'Thành công!' : 'Có lỗi xảy ra!'}
        </h3>
        <p className="notification-message">{message}</p>
        
        {/* Button đóng */}
        <button className="btn-notification" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default NotificationModal;
