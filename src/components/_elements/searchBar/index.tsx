import React, {useState, useEffect} from 'react'

interface ISerchBar {
  onSearch: (input: string) => void;
  initialQuery: string;
  placeholder:string
}
const SearchBar = ({ onSearch, initialQuery, placeholder }: ISerchBar) => {
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
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          value={query}
          type="text"
        />
      </div>
    </>
  );
};

export default SearchBar