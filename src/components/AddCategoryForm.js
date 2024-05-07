import React, { useState } from 'react';
import { invokeLambdaWBody } from '../logic/LambdaInvoker';

const AddCategoryForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    await invokeLambdaWBody("CreateCategory", {body: {
        "name": name
    }});
    console.log("Form submitted:", { name });
    onClose();
    
  };

  const handleCancel = () => {
    onClose();
  };

  return (
      <div style={formContainerStyle}>
        <form style={{width: "100%"}} onSubmit={handleSubmit}>
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
          <div style={buttonGroupStyle}>
            <button type="submit" style={buttonStyle}>Guardar</button>
            <button type="button" onClick={handleCancel} style={buttonStyle2}>Cancel</button>
          </div>
        </form>
      </div>
  );
};

export default AddCategoryForm;

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

