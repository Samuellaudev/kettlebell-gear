import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center">
      <input
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="border bg-white text-black border-gray-300 rounded-l-md px-3 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-r-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
