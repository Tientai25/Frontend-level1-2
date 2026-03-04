import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
 
  useEffect(() => {
  
    const fetchMenu = async () => {
      try {
        // fetch: Lấy dữ liệu từ file JSON
        const response = await fetch('/data/menu.json');
        const data = await response.json();

        setMenuItems(data);
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
