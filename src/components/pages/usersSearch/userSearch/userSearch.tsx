import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../../_elements/searchBar";
import ResultItem from "./resultItem";
import styles from "./userSearch.module.scss";
const { Octokit } = require("@octokit/rest");

interface ISearchResults {
  results: any[];
  onResultClick: (e: any, id: string) => void;
  loading?: boolean;
}

const SearchResults = ({ results, onResultClick, loading }: ISearchResults) => {
  return (
    <div>
      <ul role="list" >
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

const UsersSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [initialQuery, setInitialQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [APIData, setAPIData] = useState([]);
  console.log("APIData", APIData);

  useEffect(() => {
    async function handleSearch(query: string) {
      const octokit = new Octokit({
        auth: "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",
      });

      try {
        const data = await octokit.request(`GET /search/users`, {
          q: query,
        });
        setAPIData(data.data.items);
      } catch (err) {
        console.log(err);
      }
    }

    if (query !== "") {
      handleSearch(query);
    }
  }, [query]);

  useEffect(() => {
    if (query !== "") {
      setSearchPerformed(true);
    } else {
      setSearchPerformed(false);
    }
  }, [query]);

  const handleSearch = (input: string) => {
    setQuery(input);
    setInitialQuery(input);
  };

  const handleResultClick = (e: any, id: string) => {
    e.preventDefault();
    setInitialQuery("");
    setQuery("");
    setSearchPerformed(false);
    navigate(`/user/${id}`);
  };

  return (
    <div>
      <h1>Github Searcher</h1>
      <SearchBar
        initialQuery={initialQuery}
        onSearch={(e) => handleSearch(e)}
      />
      {searchPerformed && (
        <SearchResults results={APIData} onResultClick={handleResultClick} />
      )}
    </div>
  );
};

export default UsersSearch;
