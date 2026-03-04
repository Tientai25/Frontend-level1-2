import { useState } from 'react';

function useModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Mở modal đăng nhập
  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  // Mở modal đăng ký
  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  // Đóng tất cả modal
  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  // Chuyển từ register sang login
  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  // Chuyển từ login sang register
  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return {
    showLoginModal,
    showRegisterModal,
    openLoginModal,
    openRegisterModal,
    closeAllModals,
    switchToLogin,
    switchToRegister,
    setShowLoginModal,
    setShowRegisterModal
  };
}

export default useModal;
