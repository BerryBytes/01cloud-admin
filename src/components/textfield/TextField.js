import React from 'react';
import './textfield.css';

export default function CustomizedInputs({ value , id, label,customClassName,handleOnChange,handleOnBlur }) {
  return (
      <div className={ customClassName }>
          <label className='form-label' htmlFor={ id }>{label}</label>
          <input className='form-control' value={ value } id={ id } name={id} onChange={ handleOnChange } onBlur={ handleOnBlur } />
      </div>
  );
}
