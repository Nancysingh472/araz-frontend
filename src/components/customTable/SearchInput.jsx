import React, { useState, useEffect } from 'react';

const SearchInput = ({ onSearch, delay = 500 }) => {
  const [inputValue, setInputValue] = useState(''); // Local state for the input field

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay, onSearch]);

  return (
    <>
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update the local state on input change
      />
      {!inputValue && (
        <button className="btn search-btn">
          <img
            src="/assets/images/search-icon.svg"
            alt="icon"
            className="img-fluid"
          />
        </button>
      )}
    </>
  );
};

export default SearchInput;
