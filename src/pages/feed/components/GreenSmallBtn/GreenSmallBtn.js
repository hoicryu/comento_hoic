import React from 'react';

import './GreenSmallBtn.scss';

function GreenSmallBtn({ runFunction, btnName }) {
  return (
    <div className="GreenSmallBtn">
      <button onClick={runFunction}>{btnName}</button>
    </div>
  );
}

export default GreenSmallBtn;
