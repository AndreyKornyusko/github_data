import _ from "lodash";
import React, { useState, useEffect } from "react";
import Spiner from "../_elements/spinner";
import styles from "./userSearch.module.scss";

const SearchBar = ({ onSearch, initialQuery, placeholder }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleChange = (input) => {
    setQuery(input);
    onSearch(input);
  };

  useEffect(() => {
    if (initialQuery == "") {
      setQuery("");
    }
  }, [initialQuery]);

  return (
    <>
      <div>
        <div></div>
        <input
          name="search_field"
          autocomplete="off"
          className={portalInputClass}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          value={query}
          type="text"
        />
      </div>
    </>
  );
};

const ResultItem = ({ result, onResultClick }) => {
  return (
    <li id={result.id}>
      <div
        onClick={(e) => onResultClick(e, result, result.category_trees[0])}
      ></div>
    </li>
  );
};

const SearchResults = ({ results, onResultClick, loading }) => {
  return (
    <div>
      <ul role="list" className="resultList">
        {results.map((result, index) => (
          <ResultItem
            key={index}
            result={result}
            onResultClick={onResultClick}
          />
        ))}
      </ul>
    </div>
  );
};

const UsersSearch = ({ map, results, loading, onResultClick }) => {
  const [query, setQuery] = useState("");
  const [initialQuery, setInitialQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);


  // fetch items
  useEffect(() => {
    if (query !== "") {
      setSearchPerformed(true);
      // dispatch(searchCompany(query, map.id));
    } else {
      setSearchPerformed(false);
      // dispatch(searchCompanyClear());
    }
  }, [query]);

  const handleSearch = _.debounce((input) => {
    setQuery(input);
    setInitialQuery(input);
  }, 300);

  const handleResultClick = (e, result, categories) => {
    e.preventDefault();
    onResultClick({ ...result, categories });
    setInitialQuery("");
    setQuery("");
    setSearchPerformed(false);
    // dispatch(searchCompanyClear());
  };

  return (
    <div className="max-w-3xl mx-auto relative">
      <SearchBar
        placeholder="Search ..."
        initialQuery={initialQuery}
        onSearch={(e) => handleSearch(e)}
      />
      {searchPerformed && (
        <SearchResults
          results={results}
          onResultClick={handleResultClick}
          loading={loading}
        />
      )}
    </div>
  );
};

export default UsersSearch;
