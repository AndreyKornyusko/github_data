import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../../_elements/searchBar";
import ResultItem from "./resultItem";
import storage from "../../../../services/localStorage";
import styles from "./userSearch.module.scss";
import { Item } from "src/interfaces/data.interface";
const { Octokit } = require("@octokit/rest");

interface ISearchResults {
  results: Item[];
  onResultClick: (e: React.MouseEvent<HTMLElement>, id: string) => void;
  loading?: boolean;
}

const SearchResults = ({ results, onResultClick, loading }: ISearchResults) => {
  return (
    <ul className={styles.resultsList}>
      {results.map((result, index) => (
        <ResultItem key={index} result={result} onResultClick={onResultClick} />
      ))}
    </ul>
  );
};

const UsersSearch = () => {
  const token = process.env.REACT_APP_TOKEN;
  const navigate = useNavigate();
  const [initialQuery, setInitialQuery] = useState("");
  const [APIData, setAPIData] = useState<Item[]>([]);

  useEffect(() => {
    const initialItems = storage.getUserItems();
    if (initialItems?.length) {
      setAPIData(initialItems);
    }
  }, []);

  async function handleResultsSearch(query: string) {
    const octokit = new Octokit({
      // auth: token,
    });

    try {
      const data = await octokit.request(`GET /search/users`, {
        q: query,
      });
      setAPIData(data.data.items);
      storage.setUserItems(data.data.items);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSearch = (input: string) => {
    setInitialQuery(input);
    if (input) {
      handleResultsSearch(input);
    }
  };

  const handleResultClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    navigate(`/user/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Github Searcher</h1>
      <SearchBar
        initialQuery={initialQuery}
        onSearch={(e) => handleSearch(e)}
        placeholder="Search for users"
      />
      {APIData?.length ? (
        <SearchResults results={APIData} onResultClick={handleResultClick} />
      ) : null}
    </div>
  );
};

export default UsersSearch;
