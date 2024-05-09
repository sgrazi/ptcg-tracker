import React, { useState, useEffect } from 'react';
import { invokeLambda, invokeLambdaWBody } from '../logic/LambdaInvoker';

const AddCardForm = ({ onClose, existingCategories }) => {
  const [existingSets, setExistingSets] = useState([]);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [set, setSet] = useState('');
  const [wanted, setWanted] = useState('');
  const [owned, setOwned] = useState('');
  
  useEffect(() => {
    async function fetchSet() {
      const response = await invokeLambda("GetSet");
      if (response && response.StatusCode === 200) {
        let sets = JSON.parse(JSON.parse(response.Payload))
        const sortedSets = sets.sort((a, b) => b.set_id - a.set_id);
        setExistingSets(sortedSets);
      }
    }
    fetchSet();
  }, []);

  const handleCheckboxChange = (categoryId) => {
    if (categories.includes(categoryId)) {
      // Category already selected, remove it
      setCategories(categories.filter((id) => id !== categoryId));
    } else {
      // Category not selected, add it
      setCategories([...categories, categoryId]);
    }
  };

  const handleSelectChange = (event) => {
    setSet(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (wanted >= owned) {
      let url = imageUrl;
      if (url === '')
        url = 'https://i.pinimg.com/originals/37/17/24/3717242635eb3336ec720d5454b647c8.png';
      await invokeLambdaWBody("CreateCard", {body: {
        "name": name,
        'image_url': imageUrl,
        'categories': categories,
        'set': set,
        'wanted': wanted,
        'owned': owned
      }});
      console.log("Form submitted:", { name, imageUrl, categories, set, wanted, owned });
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label>URL Para Imagen</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label>Categorias</label>
            {existingCategories.map((category) => (
              <div key={category.category_id} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  id={category.category_id}
                  value={category.category_id}
                  checked={categories.includes(category.category_id)}
                  onChange={() => handleCheckboxChange(category.category_id)}
                />
                <label htmlFor={category.category_id}>{category.name}</label>
              </div>
            ))}
          </div>
          <div style={formGroupStyle}>
            <label>Set :</label>
            <select
              style={{width:'90%', height:'40px'}}
              id="existingSetsDropdown"
              value={set}
              onChange={handleSelectChange}
            >
              <option value="">Elegir set</option>
              {existingSets.map((set, index) => (
                <option key={index} value={set.set_id}>
                  {set.name}
                </option>
              ))}
            </select>
          </div>
          <div style={formGroupStyle}>
            <label>Cantidad Deseada</label>
            <input
              min="1"
              type="number"
              value={wanted}
              onChange={(e) => setWanted(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label>Cantidad Actual</label>
            <input
              type="number"
              value={owned}
              onChange={(e) => setOwned(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={buttonGroupStyle}>
            <button type="submit" style={buttonStyle}>Guardar</button>
            <button type="button" onClick={handleCancel} style={buttonStyle2}>Cancelar</button>
          </div>
        </form>
      </div>
  );
};

export default AddCardForm;


const formContainerStyle = {
  display: 'flex',
  borderRadius: '5px',
  width: '100%'
};

const formGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  width: '95%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonGroupStyle = {
  display: "flex",
  marginTop: '10px',
};

const buttonStyle = {
  display: "block",
  marginRight: '10px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  width: "calc(50% - 10px)"
};

const buttonStyle2 = {
  display: "block",
  marginLeft: '10px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  width: "calc(50% - 10px)"
};

