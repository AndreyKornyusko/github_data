import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../../_elements/searchBar";
import ResultItem from "../resultItem";
import storage from "../../../../services/localStorage";
import { UserData, UserRepo } from "src/interfaces/data.interface";
const { Octokit } = require("@octokit/rest");

interface ISearchResults {
  results: UserRepo[];
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
  const initialUserData = storage.getUserData();
  const initialUserRepos = storage.getUsersRepos();
  const cashedQuery = storage.getUsersReposQuery() || "";

  const { id } = useParams();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isReposLoading, setIsReposLoading] = useState(true);

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [userRepos, setUserRepos] = useState<UserRepo[]>([]);
  const [query, setQuery] = useState(cashedQuery);
  const [initialQuery, setInitialQuery] = useState(cashedQuery);
  const [filteredRepos, setFilteredRepos] =
    useState<UserRepo[]>(initialUserRepos);
  // console.log("userData", userData);
  // console.log("userRepos", userRepos);
  // console.log("filteredRepos", filteredRepos);
  const token = process.env.REACT_APP_TOKEN;
  const date = new Date(userData?.created_at);
  const dateMDY = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  useEffect(() => {
    async function getUser() {
      const octokit = new Octokit({
        // auth: token,
      });

      try {
        const data = await octokit.request(`GET /users/${id}`, {
          username: id,
        });
        storage.setUserData(data.data);
        setUserData(data.data);
        setIsUserLoading(false);
      } catch (err) {
        console.log(err);
        storage.removeUserData();
        setIsUserLoading(false);
      }
    }
    if (id) {
      getUser();
    }
  }, []);

  useEffect(() => {
    async function handleReposSearch() {
      const octokit = new Octokit({
        // auth: token,
      });

      try {
        const data = await octokit.request(`GET /users/${id}/repos`, {
          username: id,
        });
        setUserRepos(data.data);
        storage.setUsersRepos(data.data);
        setIsReposLoading(false);
      } catch (err) {
        console.log(err);
        storage.removeUsersRepos();
        storage.removeUsersReposQuery();
        setIsReposLoading(false);
      }
    }
    if (id) {
      handleReposSearch();
    }
  }, []);

  useEffect(() => {
    if (!query) {
      storage.removeUsersReposQuery();
      storage.removeUsersRepos();
    }
  }, [query]);

  const handleSearch = (searchValue: string) => {
    setQuery(searchValue);
    setInitialQuery(searchValue);
    storage.setUsersReposQuery(searchValue);

    if (query !== "") {
      const filteredData = userRepos.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setFilteredRepos(filteredData);
    }
  };

  return (
    <div>
      <h1>Github Searcher</h1>
      {isUserLoading||!userData ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <div>
              <img src={userData?.avatar_url} alt="user avatar" />
            </div>
            <div>
              <div>User name {userData?.name}</div>
              <div>Email {userData?.email}</div>
              <div>Location {userData?.location}</div>
              <div>Join Date {dateMDY ? dateMDY : ""}</div>
              <div>Followers {userData?.followers}</div>
              <div>Following {userData?.following}</div>
            </div>
          </div>
          <div>{userData?.bio}</div>
        </div>
      )}
      <SearchBar
        initialQuery={initialQuery}
        onSearch={(e) => handleSearch(e)}
        placeholder="Search for user`s repositories"
      />
      {filteredRepos?.length&&!isReposLoading ? <SearchResults results={filteredRepos} /> : null}
    </div>
  );
};
export default UserInfo;
