import { useEffect, useState } from "react";
const { Octokit } = require("@octokit/rest");

interface IResultItem {
  result: any;
  onResultClick: (e: any, id: string) => void;
}

const ResultItem = ({ result, onResultClick }: IResultItem) => {
  const [userData, setUserData] = useState<any>(null);
  // console.log("userData", userData)
  useEffect(() => {
    async function handleSearch(id: string) {
      const octokit = new Octokit({
        auth: "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",
      });

      const data = await octokit.request(`GET /users/${id}`, {
        username: id,
      });
      setUserData(data.data);
    }

    if (result?.login) {
      handleSearch(result.login);
    }
  }, []);

  return (
    <li>
      <div onClick={(e) => onResultClick(e, result.login)}>
        <img src={result.avatar_url} alt="user avatar" />
        <div>{userData?.name}</div>
        <div>Repo: {userData?.public_repos}</div>
      </div>
    </li>
  );
};

export default ResultItem;
