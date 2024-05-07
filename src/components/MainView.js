import React from 'react';
import CardDisplay from './CardDisplay';

const mainStyle = {
marginLeft: "10px",
paddingRight: "10px",
  width: '100%'
}

function MainView({ cards, onDeleteCard }) {
    return (
        <div style={mainStyle}>
            <h2 style={{color:'#dddddd'}}>Cartas:</h2>
            {cards.map((card) => (
                <CardDisplay key={card.id} card={card} onDelete={onDeleteCard}/>
            ))}
        </div>
    );
}

export default MainView;
