import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CaseContext } from './../context/CaseContext';

export default function Search() {
  const {
    clickSearch,
    caseData,
    showSearch,
    setShowSearch,
    setShowInfo,
    clickMarker,
  } = useContext(CaseContext);

  const [search, setSearch] = useState('');
  const [searchItems, setSearchItems] = useState(caseData);

  useEffect(() => {
    setSearchItems(caseData);
  }, [caseData]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('enter');
      clickMarker(searchItems[0].id);
      setShowSearch(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value != '') {
      const list = caseData.filter((data) =>
        title(data).toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchItems(list);
    } else {
      setSearchItems(caseData);
    }

    setShowSearch(true);
    setShowInfo(false);
  };

  const handleClick = (e) => {
    setShowSearch(true);
    setShowInfo(false);
  };

  const caseClass = (confirmedCase) => {
    const className = 'result__case result__case';
    if (confirmedCase >= 100000) return className + '--purple';
    if (confirmedCase >= 10000) return className + '--red';
    if (confirmedCase >= 1000) return className + '--orange';
    return className + '--green';
  };

  const title = (item) => {
    if (item.province) return `${item.province}, ${item.country}`;
    else return item.country;
  };

  const searchList =
    searchItems &&
    searchItems.map((item) => (
      <div
        className='result__item'
        key={item.id}
        onClick={() => {
          clickMarker(item.id);
          setShowSearch(false);
        }}
      >
        <span className='result__country'>{title(item)}</span>
        <span className={caseClass(item.latest.confirmed)}>
          {item.latest.confirmed.toLocaleString()}
        </span>
      </div>
    ));

  return (
    <div className='search-wrapper'>
      <div className='search card' style={{ zIndex: 1000 }}>
        <div className='search__bar' onClick={() => clickSearch}>
          <input
            className='search__text'
            type='text'
            placeholder='Search'
            name='search'
            onChange={handleChange}
            onClick={handleClick}
            onKeyPress={handleKeyPress}
          ></input>
          <FontAwesomeIcon className='search__icon' icon={faSearch} size='lg' />
        </div>
        {showSearch && searchItems.length > 0 && (
          <div className='result'>{searchList}</div>
        )}
      </div>
    </div>
  );
}
