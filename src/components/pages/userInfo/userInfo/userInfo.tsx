import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../../_elements/searchBar";
import ResultItem from "../resultItem";
const { Octokit } = require("@octokit/rest");

interface ISearchResults {
  results: any[];
}
const SearchResults = ({ results }: ISearchResults) => {
  return (
    <div>
      <ul role="list">
        {results.map((result, index) => (
          <ResultItem key={index} result={result} />
        ))}
      </ul>
    </div>
  );
};
const UserInfo = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [userRepos, setUserRepos] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [initialQuery, setInitialQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  console.log("userData", userData);
  console.log("userRepos", userRepos);
  console.log("filteredRepos", filteredRepos);

  useEffect(() => {
    async function handleSearch() {
      const octokit = new Octokit({
        auth: "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",
      });

      const data = await octokit.request(`GET /users/${id}`, {
        username: id,
      });
      setUserData(data.data);
    }
    if (id) {
      handleSearch();
    }
  }, []);

  useEffect(() => {
    if (query !== "") {
      setSearchPerformed(true);
    } else {
      setSearchPerformed(false);
    }
  }, [query]);

  useEffect(() => {
    if (query !== "") {
      searchItems(query);
    }
  }, [query]);

  useEffect(() => {
    async function handleReposSearch() {
      const octokit = new Octokit({
        auth: "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",
      });

      const data = await octokit.request(`GET /users/${id}/repos`, {
        username: id,
      });
      setUserRepos(data.data);
    }
    if (id) {
      handleReposSearch();
    }
  }, []);

  const handleSearch = (input: string) => {
    setQuery(input);
    setInitialQuery(input);
  };

  const searchItems = (searchValue: string) => {
    setQuery(searchValue);
    setInitialQuery(searchValue);

    if (query !== "") {
      const filteredData = userRepos.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setFilteredRepos(filteredData);
    } else {
      setFilteredRepos(userRepos);
    }
  };

  return (
    <div>
      <h1>Github Searcher</h1>
      <div>
        <div>
          <img src={userData?.avatar_url} alt="user avatar" />
        </div>
        <div>
          <div>User name {userData?.name}</div>
          <div>Email {userData?.email}</div>
          <div>Location {userData?.location}</div>
          <div>Join Date {userData?.created_at}</div>
          <div>Followers {userData?.followers}</div>
          <div>Following {userData?.following}</div>
        </div>
      </div>
      <SearchBar
        initialQuery={initialQuery}
        onSearch={(e) => handleSearch(e)}
      />
      {searchPerformed && <SearchResults results={filteredRepos} />}
    </div>
  );
};
export default UserInfo;
