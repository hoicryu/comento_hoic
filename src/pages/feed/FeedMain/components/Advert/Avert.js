import React from 'react';

import './Avert.scss';

function Avert({ runFunction, imgFile }) {
  return (
    <article className="Avert">
      <h2>sponsered</h2>
      <div className="postImgBox">
        <img
          src={`https://cdn.comento.kr/assignment/${imgFile}`}
          alt="광고이미지"
        />
        <div className="post">
          <h3>찌워니 바부</h3>
          <p>contents</p>
        </div>
      </div>
    </article>
  );
}

export default Avert;
