import React from 'react';
import { useHistory } from 'react-router-dom';

import './Contents.scss';

function Contents({ data }) {
  const { user_id, category_name, created_at, title, contents, id } = data;
  const history = useHistory();
  const goToDetailPage = (id) => {
    history.push(`/detail/${id}`);
  };

  return (
    <article className="Contents" onClick={() => goToDetailPage(id)}>
      <h2>{category_name}</h2>
      <div className="post">
        <div className="addition">
          <span>{user_id}</span>
          <span>{created_at.slice(0, 10)}</span>
        </div>
        <h3>{title.length >= 30 ? title.slice(0, 30) + '...' : title}</h3>
        <p>
          {contents.length >= 25 ? contents.slice(0, 25) + '...' : contents}
        </p>
      </div>
    </article>
  );
}

export default Contents;
