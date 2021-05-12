import React from 'react';

import './Contents.scss';

function Contents({ runFunction }) {
  return (
    <article className="Contents">
      <h2>categoryname</h2>
      <div className="post">
        <div className="addition">
          <span>user_id</span>
          <span>created_at(2020)</span>
        </div>
        <h3>아라미 바부</h3>
        <p>contents</p>
      </div>
    </article>
  );
}

export default Contents;
