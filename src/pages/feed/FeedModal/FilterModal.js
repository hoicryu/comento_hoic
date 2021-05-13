import React from 'react';

import InputBox from '../components/InputBox/InputBox';
import GreenSmallBtn from '../components/GreenSmallBtn/GreenSmallBtn';

import './FilterModal.scss';

function FilterModal({
  close,
  categoryData,
  runFunction,
  applyFilter,
  checkCategory,
}) {
  return (
    <div className="FilterModalWrapper">
      <div className="FilterModal">
        <h1>필터</h1>
        <img src="/images/close.png" alt="x" onClick={close} />
        <div className="categoryList">
          {categoryData.map((category, idx) => {
            return (
              <InputBox
                key={category.id}
                type="checkbox"
                labelName={category.name}
                name={category.id}
                runFunction={runFunction}
                checked={checkCategory[idx + 1]}
              />
            );
          })}
        </div>
        <GreenSmallBtn btnName="저장하기" runFunction={applyFilter} />
      </div>
    </div>
  );
}

export default FilterModal;
