import React, { useState, useEffect } from "react";
import axios from "axios";
export default function UsersSearch() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios.get(`https://api.github.com/search/users`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div >
      <input
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <div>
        {searchInput.length > 1
          ? filteredResults.map((item) => {
              return <div>
                
              </div>;
            })
          : null}
      </div>
    </div>
  );
}
