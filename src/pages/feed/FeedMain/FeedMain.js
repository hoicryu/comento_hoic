import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GreenBtn from '../components/GreenBtn/GreenBtn';
import SortBtn from '../components/SortBtn/SortBtn';
import Contents from './components/Contents/Contents';
import Avert from './components/Advert/Avert';

import { CONTENTS_API, ADVERT_API, FILTER_API } from '../../../config';

import './FeedMain.scss';

function FeedMain() {
  // 데이터를 받아올 기준
  const [contentsFilterCondition, setContentsFilterCondition] = useState({
    page: 1,
    ord: 'asc',
    category: 1,
    limit: 10,
  });
  const [advertFilterCondition, setAdvertFilterCondition] = useState({
    page: 1,
    limit: 10,
  });

  // 받아온 데이터
  const [contentsData, setContentsData] = useState([]);
  const [advertData, setAdvertData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // 그외 기능을 위한 상태 값
  const [selectedAscending, setSelectedAscending] = useState(true);

  useEffect(() => {
    getContentsList();
    getAdvertList();
    getCategoryList();
  }, []);

  const sortBtnToggle = (e) => {
    setSelectedAscending(e.target.name === 'asc');
    if (e.target.name === 'asc') {
      setContentsFilterCondition({ ...contentsFilterCondition, ord: 'asc' });
    }
    if (e.target.name === 'desc') {
      setContentsFilterCondition({ ...contentsFilterCondition, ord: 'desc' });
    }
  };

  const getContentsList = () => {
    const { page, ord, category, limit } = contentsFilterCondition;
    axios
      .get(
        `${CONTENTS_API}?page=${page}&ord=${ord}&category[]=${category}&limit=${limit}`,
        {
          header: {
            Accept: 'application/json',
          },
        }
      )
      .then((contents) => setContentsData(contents.data.data))
      .catch((err) => console.log(err));
  };

  const getAdvertList = () => {
    const { page, limit } = advertFilterCondition;
    axios
      .get(`${ADVERT_API}?page=${page}&limit=${limit}`, {
        header: {
          Accept: 'application/json',
        },
      })
      .then((advert) => setAdvertData(advert.data.data))
      .catch((err) => console.log(err));
  };

  const getCategoryList = () => {
    axios
      .get(`${FILTER_API}`, {
        header: {
          Accept: 'application/json',
        },
      })
      .then((category) => setCategoryData(category.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="FeedMainWrapper">
      <header>
        <h1>[5월 13일] 유호익</h1>
      </header>
      <div className="FeedMain">
        <div className="mainAsideWrapper">
          <aside>
            <GreenBtn btnName="로그인" />
          </aside>
          <main>
            <div className="btnWrapper">
              <div className="sortBtnBox">
                <SortBtn
                  name="asc"
                  btnName="오름차순"
                  selectedAscending={selectedAscending}
                  runFunction={sortBtnToggle}
                />
                <SortBtn
                  name="desc"
                  btnName="내림차순"
                  selectedAscending={!selectedAscending}
                  runFunction={sortBtnToggle}
                />
              </div>
              <button className="filterBtn">필터</button>
            </div>
            <Contents />
            <Avert />
          </main>
        </div>
      </div>
    </div>
  );
}

export default FeedMain;
