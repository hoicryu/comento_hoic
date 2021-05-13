import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { CONTENTS_DETAIL_API } from '../../../config';

function FeedDetail(props) {
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    getDetailList();
  }, []);

  const getDetailList = () => {
    axios
      .get(`${CONTENTS_DETAIL_API}?id=${props.match.params.id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((detailData) => setDetailData(detailData.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>{detailData.title}</h3>
      <p>{detailData.contents}</p>
      <p>답변</p>
    </div>
  );
}

export default FeedDetail;
