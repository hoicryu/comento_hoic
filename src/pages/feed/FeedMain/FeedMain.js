import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import GreenBtn from '../components/GreenBtn/GreenBtn';
import SortBtn from '../components/SortBtn/SortBtn';
import Contents from './components/Contents/Contents';
import Avert from './components/Advert/Avert';
import FilterModal from '../FeedModal/FilterModal';

import { CONTENTS_API, ADVERT_API, FILTER_API } from '../../../config';

import './FeedMain.scss';

function FeedMain() {
  // 데이터를 받아올 기준
  const [contentsFilterCondition, setContentsFilterCondition] = useState({
    page: 1,
    ord: 'asc',
    category: [1, 2, 3],
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

  // 보여질 데이터
  const [mixedData, setMixedData] = useState([]);

  // 그외 기능을 위한 상태 값
  const [selectedAscending, setSelectedAscending] = useState(true);
  const [popUpModal, setPopUpModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    category: new Set([]),
  });
  const [checkCategory, setCheckCategory] = useState({
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    getContentsList();
    getAdvertList();
    getCategoryList();
  }, []);

  useEffect(() => {
    getContentsList();
  }, [contentsFilterCondition]);

  useEffect(() => {
    getAdvertList();
  }, [advertFilterCondition]);

  useEffect(() => {
    mixData(contentsData, advertData);
  }, [contentsData, advertData]);

  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      const TenMore = () => {
        if (contentsFilterCondition.limit <= 90) {
          setContentsFilterCondition({
            ...contentsFilterCondition,
            limit: contentsFilterCondition.limit + 10,
          });
          setAdvertFilterCondition({
            ...advertFilterCondition,
            limit: advertFilterCondition.limit + 10,
          });
        }
      };
      setTimeout(TenMore, 1000);
    }
  }, [contentsFilterCondition]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
  }, [infiniteScroll]);

  const sortBtnToggle = (e) => {
    const { name } = e.target;
    setSelectedAscending(name === 'asc');
    setContentsFilterCondition({ ...contentsFilterCondition, ord: name });
  };

  const categoryToUrl = (url, category) => {
    let urlArray = new Array(url);
    for (let i = 0; i < category.length; i++) {
      urlArray.push(`category[]=${category[i]}`);
    }

    return urlArray.join('&');
  };

  const getContentsList = () => {
    const { page, ord, category, limit } = contentsFilterCondition;
    axios
      .get(
        categoryToUrl(
          `${CONTENTS_API}?page=${page}&ord=${ord}&limit=${limit}`,
          category
        ),
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
      .then((category) => setCategoryData(category.data.category))
      .catch((err) => console.log(err));
  };

  const openModal = () => {
    setPopUpModal(true);
  };

  const closeModal = () => {
    setPopUpModal(false);
  };

  const checkCategoryFilter = (e) => {
    const { name, checked } = e.target;
    setCheckCategory({ ...checkCategory, [name]: checked });
    if (checked) {
      selectedCategory.category.add(name);
    } else {
      selectedCategory.category.delete(name);
    }
  };

  const applyFilter = () => {
    setContentsFilterCondition({
      ...contentsFilterCondition,
      category: [...selectedCategory.category],
    });
    setPopUpModal(false);
  };

  const mixData = (contentsData, [...advertData]) => {
    const mixedData = [];
    const AddedcategoryName = contentsData.map((el) => {
      if (el.category_id === 1) el.category_name = 'apple';
      if (el.category_id === 2) el.category_name = 'banana';
      if (el.category_id === 3) el.category_name = 'coconut';
      return el;
    });

    AddedcategoryName.forEach((el, index) => {
      if ((index + 1) % 3 !== 0) {
        mixedData.push(el);
      } else {
        mixedData.push(el);
        mixedData.push(advertData.shift());
      }
    });
    setMixedData(mixedData);
  };

  return (
    <div className="FeedMainWrapper">
      {popUpModal && (
        <FilterModal
          close={closeModal}
          categoryData={categoryData}
          runFunction={checkCategoryFilter}
          applyFilter={applyFilter}
          checkCategory={checkCategory}
        />
      )}
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
              <button className="filterBtn" onClick={openModal}>
                필터
              </button>
            </div>
            {mixedData.length ? (
              mixedData.map((data, idx) => {
                if ((idx + 1) % 4 === 0) {
                  return <Avert data={data} key={idx} />;
                } else {
                  return <Contents data={data} key={idx} />;
                }
              })
            ) : (
              <></>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default FeedMain;
