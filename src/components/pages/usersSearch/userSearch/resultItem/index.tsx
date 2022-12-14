import { useEffect, useState } from "react";
import {Item, UserData} from 'src/interfaces/data.interface'
import styles from './resultItem.module.scss'
const { Octokit } = require("@octokit/rest");

interface IResultItem {
  result: Item;
  onResultClick: (e: React.MouseEvent<HTMLElement>, id: string) => void;
}

const ResultItem = ({ result, onResultClick }: IResultItem) => {
  const token = process.env.REACT_APP_TOKEN

  const [userData, setUserData] = useState<UserData|null>(null);
  useEffect(() => {
    async function getUser(id: string) {
      const octokit = new Octokit({
        // auth: token,
      });

      try {
        const data = await octokit.request(`GET /users/${id}`, {
          username: id,
        });
        setUserData(data.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (result?.login) {
      getUser(result.login);
    }
  }, []);

  return (
    <li className={styles.listItem}>
      <div className={styles.resultItem} onClick={(e) => onResultClick(e, result.login)}>
        <img className={styles.userAvatar} src={result.avatar_url} alt="user avatar" />
        <div className={styles.userName}>{userData?.name}</div>
        <div className={styles.userRepo}>Repo: <span>{userData?.public_repos}</span></div>
      </div>
    </li>
  );
};

export default ResultItem;
