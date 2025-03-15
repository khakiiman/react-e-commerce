import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import useDebounce from "../hooks/useDebounce";

function Search({ query: { query, setQuery } }) {
  const [searchString, setSearchString] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  

  const debouncedSearchTerm = useDebounce(searchString, 400);


  useEffect(() => {
    if (searchParams.get("search")) {
      setQuery({ ...query, search: searchParams.get("search") });
      setSearchString(searchParams.get("search"));
    }
  }, []);


  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      handleSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (searchValue) => {
    if (searchValue === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
      setQuery({...query, search: ''});
      return;
    }
    
    setQuery({ ...query, search: searchValue });
    setSearchParams({ ...query, search: searchValue });
  };
  
  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchString(inputValue);
  };
  
  const clearSearch = () => {
    setSearchString("");
    searchParams.delete("search");
    setSearchParams(searchParams);
    setQuery({...query, search: ''});
  };
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 z-10 flex items-center pointer-events-none start-0 ps-3">
        <CiSearch className="w-5 h-5 text-gray-500" />
      </div>
      
      <input
        type="text"
        onChange={handleInputChange}
        value={searchString}
        className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none ps-10 pe-10 bg-gray-50 focus:ring-gray-700 focus:border-gray-700 dark:bg-grayshade-500 dark:border-grayshade-300 dark:placeholder-grayshade-50 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
        placeholder="Search products..."
        data-testid="search-input"
      />
      
      {searchString && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 z-10 flex items-center cursor-pointer end-0 pe-3"
          aria-label="Clear search"
          data-testid="clear-search"
        >
          <IoMdClose className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
        </button>
      )}
    </div>
  );
}

export default Search;
