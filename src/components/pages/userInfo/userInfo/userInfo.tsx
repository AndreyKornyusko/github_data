import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../../_elements/searchBar";
import ResultItem from "../resultItem";
import storage from "../../../../services/localStorage";
import { UserData, UserRepo } from "src/interfaces/data.interface";
import styles from './userInfo.module.scss'
const { Octokit } = require("@octokit/rest");

interface ISearchResults {
  results: UserRepo[];
}
const SearchResults = ({ results }: ISearchResults) => {
  return (
      <ul className={styles.resultsList}>
        {results.map((result, index) => (
          <ResultItem key={index} result={result} />
        ))}
      </ul>
  );
};
const UserInfo = () => {
  const initialUserData = storage.getUserData();
  const initialUserRepos = storage.getUsersRepos();
  const cashedQuery = storage.getUserReposQuery();
  const { id } = useParams();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isReposLoading, setIsReposLoading] = useState(true);
  const [registerDate, setRegisterDate] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userRepos, setUserRepos] = useState<UserRepo[]>([]);
  const [query, setQuery] = useState("");
  const [initialQuery, setInitialQuery] = useState("");
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    if (userData) {
      const date = new Date(userData?.created_at);
      const dateMDY = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      setRegisterDate(dateMDY);
    }
  }, [userData]);

  useEffect(() => {
    if(cashedQuery&&initialUserData?.login===id){
      setQuery(cashedQuery)
      setInitialQuery(cashedQuery)
    }
  }, [isReposLoading]);

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
    if (id && initialUserData?.login!==id) {
      getUser();
    } else {
      setUserData(initialUserData)
      setIsUserLoading(false);
    }
  }, [id]);

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
        storage.removeUserReposQuery();
        setIsReposLoading(false);
      }
    }
    if (id && initialUserData?.login!==id) {
      handleReposSearch();
    } else {
      setUserRepos(initialUserRepos)
      setIsReposLoading(false);

    }
  }, [id]);


  useEffect(() => {
    if (query) {
      handleSearchRepos(query);
    }
  }, [query]);

  const handleSearchRepos = (searchValue: string) => {
    if (searchValue !== "") {
      const filteredData = userRepos.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setUserRepos(filteredData);
    }
  };

  const handleSearch = (searchValue: string) => {
    setQuery(searchValue);
    storage.setUserReposQuery(searchValue);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Github Searcher</h1>
      {isUserLoading || !userData ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.content}>
          <div className={styles.userCard}>
            <div className={styles.userImgWrap}>
              <img className={styles.userImg} src={userData?.avatar_url} alt="user avatar" />
            </div>
            <div className={styles.userInfoWrap}>
              <div className={styles.userData}>User name <span>{userData?.name}</span></div>
              <div className={styles.userData}>Email <span>{userData?.email}</span></div>
              <div className={styles.userData}>Location <span>{userData?.location}</span></div>
              <div className={styles.userData}>Join Date <span>{registerDate}</span></div>
              <div className={styles.userData}>Followers <span>{userData?.followers}</span></div>
              <div className={styles.userData}>Following <span>{userData?.following}</span></div>
            </div>
          </div>
          <div className={styles.userBio}>{userData?.bio}</div>
        </div>
      )}
      <SearchBar
        initialQuery={initialQuery}
        onSearch={(e) => handleSearch(e)}
        placeholder="Search for user`s repositories"
      />
      {userRepos?.length && !isReposLoading ? (
        <SearchResults results={userRepos} />
      ) : null}
    </div>
  );
};
export default UserInfo;
