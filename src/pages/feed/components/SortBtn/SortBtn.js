import React from 'react';

import './SortBtn.scss';

function SortBtn({ runFunction, btnName, name, selectedAscending }) {
  return (
    <div className="SortBtn">
      <div className={`Dot ${selectedAscending && 'green'}`}></div>
      <button
        name={name}
        className={`${selectedAscending && 'green'}`}
        onClick={runFunction}
      >
        {btnName}
      </button>
    </div>
  );
}

export default SortBtn;
