import React, {useState, useEffect} from 'react'

interface ISerchBar {
  onSearch: (input: string) => void;
  initialQuery: string;
}
const SearchBar = ({ onSearch, initialQuery }: ISerchBar) => {
  const [query, setQuery] = useState(initialQuery);

  const handleChange = (input: string) => {
    setQuery(input);
    onSearch(input);
  };

  useEffect(() => {
    if (initialQuery == "") {
      setQuery("");
    }
  }, [initialQuery]);

  return (
    <>
      <div>
        <div></div>
        <input
          name="search_field"
          autoComplete="off"
          placeholder="Search for Users"
          onChange={(e) => handleChange(e.target.value)}
          value={query}
          type="text"
        />
      </div>
    </>
  );
};

export default SearchBar