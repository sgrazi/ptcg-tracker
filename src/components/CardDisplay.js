import React, { useState } from 'react';
import { invokeLambdaWBody } from '../logic/LambdaInvoker';

const cardStyles = {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
};

const buttonColumn = {
    display: "flex",
    flexDirection: "column"
}

const imageStyles = {
    width: '150px',
    height: 'auto',
    marginRight: '20px',
};

const detailsStyles = {
    flex: '1',
};

function CardDisplay({ card, onDelete }) {
    let collectionGoal = ""
    let plural = ""
    if (card.owned_quantity < card.wanted_quantity){
        plural = (card.wanted_quantity - card.owned_quantity) > 1 ? "n " : " ";
        collectionGoal = "Falta" + plural + String(card.wanted_quantity - card.owned_quantity)
    } else {
        collectionGoal = "Woohoo!"
    }
    
    const [wanted, setWanted] = useState(card.wanted_quantity);
    const [owned, setOwned] = useState(card.owned_quantity);
    const [editMode, setEditMode] = useState(false);

    const handleSaveEdit = async () => {
        await invokeLambdaWBody("UpdateCard", {body: {"card_id": card.card_id, "owned_quantity": owned, "wanted_quantity": wanted}})
        card.wanted_quantity = wanted
        card.owned_quantity = owned
        setEditMode(false);
    }

    const handleCancelEdit = () => {
        setWanted(card.wanted_quantity)
        setOwned(card.owned_quantity)
        setEditMode(false);
    }

    const handleOwnedChange = (event) => {
        setOwned(event.target.value);
    };

    const handleWantedChange = (event) => {
        setWanted(event.target.value);
    };

    return (
        <div style={cardStyles}>
            <img src={card.image_url} alt={card.name} style={imageStyles} />
            <div style={detailsStyles}>
                <h3>{card.name}</h3>
                <p><strong>Set:</strong> {card.set}</p>
                {editMode ? 
                    <>
                    <select value={owned} onChange={handleOwnedChange}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    /
                    <select value={wanted} onChange={handleWantedChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    </> :
                    <p> {card.owned_quantity} <strong>/</strong> {card.wanted_quantity} ({collectionGoal})</p>
                }
                <p><strong>Categorias:</strong> {card.categories.join(', ')}</p>
            </div>
            <div style={buttonColumn}>
                <button onClick={() => onDelete(card.card_id)}>🗑️</button>
                {editMode ?
                    <>
                        <button onClick={handleSaveEdit}>✅</button>
                        <button onClick={handleCancelEdit}>❎</button>
                    </> :
                    <button onClick={() => setEditMode(true)}>✏️</button>
                }
            </div>
        </div>
    );
}

export default CardDisplay;
