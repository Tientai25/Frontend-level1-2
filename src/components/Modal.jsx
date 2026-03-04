import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  // Nếu không mở thì không hiển thị gì
  if (!isOpen) return null;
  
  // Đóng modal khi click vào overlay (vùng tối bên ngoài)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            X
          </button>
        </div>
        
        {/* Body - Nội dung chính */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
