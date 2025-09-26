import React from 'react';

const CipherForm = ({ 
  shift, 
  onShiftChange, 
  text, 
  onTextChange, 
  onSubmit, 
  buttonText 
}) => {
  return (
    <>
      <div className="form-group">
        <label>Shift:</label>
        <input
          type="number"
          value={shift}
          onChange={(e) => onShiftChange(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="form-group">
        <label>Texto:</label>
        <textarea
          rows="4"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </div>
      <button onClick={onSubmit}>
        {buttonText}
      </button>
    </>
  );
};

export default CipherForm;