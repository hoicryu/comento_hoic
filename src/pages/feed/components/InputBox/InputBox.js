import React from 'react';

import './InputBox.scss';

function InputBox({ name, type, labelName, runFunction, checked }) {
  return (
    <div className="InputBox">
      <input name={name} type={type} onChange={runFunction} checked={checked} />
      <label>{labelName}</label>
    </div>
  );
}

export default InputBox;
