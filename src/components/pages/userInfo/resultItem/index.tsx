import { UserRepo } from "src/interfaces/data.interface";
import styles from "./resultItem.module.scss";
interface IResultItem {
  result: UserRepo;
}

const ResultItem = ({ result }: IResultItem) => {
  return (
    <li className={styles.listItem}>
      <a className={styles.link} href={result?.url} target="_blank">
        <div className={styles.name}>{result?.name}</div>
        <div className={styles.textWrap}>
          <div className={styles.text}><span>{result?.forks_count}</span> Forks</div>
          <div className={styles.text}><span>{result?.stargazers_count}</span> Stars</div>
        </div>
      </a>
    </li>
  );
};

export default ResultItem;
