
interface IResultItem {
  result: any;
}

const ResultItem = ({ result }: IResultItem) => {


  return (
    <li>
      <a href={result?.url} target="_blank">
        <div>{result?.name}</div>
        <div>Forks: {result?.forks}</div>
        <div>Stars: {result?.stargazers_count}</div>

      </a>
    </li>
  );
};

export default ResultItem;
