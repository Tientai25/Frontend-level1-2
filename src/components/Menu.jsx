import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import API_BASE_URL from '../config/api';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
 
  useEffect(() => {
  
    const fetchMenu = async () => {
      try {
        // 1. Lấy từ local JSON
        const localResponse = await fetch('/data/menu.json');
        const localData = await localResponse.json();
        
        // 2. Lấy từ backend API
        let backendData = [];
        try {
          const backendResponse = await fetch(`${API_BASE_URL}/menu`);
          if (backendResponse.ok) {
            backendData = await backendResponse.json();
          }
        } catch (apiError) {
          console.warn('Backend API không khả dụng:', apiError);
        }
        
        // 3. Gộp cả 2 nguồn (backend trước để ưu tiên)
        const mergedData = [...backendData, ...localData];
        setMenuItems(mergedData);
      } catch (error) {
        console.error('Lỗi khi tải menu:', error);
      }
    };
    
    fetchMenu();
  }, []); 
  
  return (
    <nav className="menu">
      <div className="container">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className="menu-icon">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
