import React from 'react';

import './Avert.scss';

function Avert({ runFunction, data }) {
  return (
    <article className="Avert">
      <h2>sponsered</h2>
      <div className="postImgBox">
        {data && (
          <img
            src={`https://cdn.comento.kr/assignment/${data.img}`}
            alt="광고이미지"
          />
        )}

        {data && (
          <div className="post">
            <h3>
              {data.title.length >= 30
                ? data.title.slice(0, 30) + '...'
                : data.title}
            </h3>
            <p>
              {data.contents.length >= 25
                ? data.contents.slice(0, 25) + '...'
                : data.contents}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default Avert;
