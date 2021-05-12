import React from 'react';

import './GreenBtn.scss';

function GreenBtn({ runFunction, btnName }) {
  return (
    <div className="GreenBtn">
      <button onClick={runFunction}>{btnName}</button>
    </div>
  );
}

export default GreenBtn;
