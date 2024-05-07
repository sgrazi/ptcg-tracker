import React, { useState } from 'react';
import AddCardForm from './AddCardForm'
import AddCategoryForm from './AddCategoryForm'

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '350px',
  height: '100%',
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  boxSizing: 'border-box',
  transition: 'transform 0.3s ease-in-out',
  zIndex: 900
};

const buttonStyle = {
  display: "block",
  marginLeft: "10px",
  marginRight: "10px",
  padding: '10px 20px',
  backgroundColor: '#f6bd20',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  width: "calc(100% - 20px)" // Subtracting the total left and right padding
};

const mainButtonStyle = {
  display: "block",
  margin: "10px",
  padding: '10px 20px',
  backgroundColor: '#c52018',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  width: "calc(100% - 20px)"
};


function Sidebar({isOpen, setIsOpen}) {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const toggleAddCardForm = () => {
    setShowAddCardForm(!showAddCardForm);
  };

  const toggleAddCategoryForm = () => {
    setShowAddCategoryForm(!showAddCategoryForm);
  };

  return (
    <>
      <button style={buttonStyle} onClick={() => setIsOpen(true)}>Open Sidebar</button>
      <div style={{ ...sidebarStyle, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <button style={buttonStyle} onClick={() => setIsOpen(false)}>Close</button>
        <h2>Sidebar</h2>
        <button style={mainButtonStyle} onClick={toggleAddCardForm}>Agregar Carta</button>
        {showAddCardForm && <AddCardForm onClose={toggleAddCardForm}/>}
        <button style={mainButtonStyle} onClick={toggleAddCategoryForm}>Agregar Categoria</button>
        {showAddCategoryForm && <AddCategoryForm onClose={toggleAddCategoryForm}/>}
      </div>
    </>
  );
}

export default Sidebar;
