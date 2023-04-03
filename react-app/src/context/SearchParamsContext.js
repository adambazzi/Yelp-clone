import { createContext, useState, useContext } from 'react';

export const SearchParamsContext = createContext();
export const useSearchParams = () => useContext(SearchParamsContext)

export default function SearchParamsProvider(props) {
  const [searchParams, setSearchParams] = useState({
    filters:false,
    search: '',
    query: {
      city: '',
      state: '',
      price: '',
      categories: '',
      features: ''
    }
  });
  return (
    <SearchParamsContext.Provider
      value={{
        searchParams,
        setSearchParams
      }}
    >
      {props.children}
    </SearchParamsContext.Provider>
  )
}
