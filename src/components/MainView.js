import React from 'react';
import CardDisplay from './CardDisplay';

const mainStyle = {
    marginLeft: "10px",
    width: '100%'
}

const buttonStyle = {
    marginLeft: '11px',
    padding: '10px 20px',
    backgroundColor: '#793420',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

function MainView({ cards, search, onDeleteCard, existingCategories }) {
    const handleCategoryFilter = (cat_id) => {
        search(cat_id)
    }

    return (
        <div style={mainStyle}>
            <h4 style={{marginLeft: "11px", color:'#dddddd'}}>Filter por categoria:</h4>
            {existingCategories.map((cat) => (
                <button style={buttonStyle} onClick={() => handleCategoryFilter(cat.category_id)} key={cat.category_id}>{cat.name}</button>
            ))}
            <h2 style={{marginLeft: "11px",color:'#dddddd'}}>Cartas:</h2>
            {cards.map((card) => (
                <CardDisplay key={card.id} card={card} onDelete={onDeleteCard}/>
            ))}
        </div>
    );
}

export default MainView;
