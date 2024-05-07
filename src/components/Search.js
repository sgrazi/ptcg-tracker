import React, { useState } from 'react';

const searchViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '15px',
  width: '100%'
};

const inputStyle = {
  margin: '11px',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
  width: '100%'
};

const buttonStyle = {
  marginRight: '11px',
  padding: '10px 20px',
  backgroundColor: '#f6bd20',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

function Search({ searchCallback }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    searchCallback(query);
  };

  return (
    <div style={searchViewStyle}>
      <input
        type="text"
        placeholder="Buscar cartas por nombre"
        value={query}
        onChange={handleInputChange}
        style={inputStyle}
      />
      <button onClick={handleSearch} style={buttonStyle}>Buscar</button>
    </div>
  );
}

export default Search;
