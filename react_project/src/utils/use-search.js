import {useState} from 'react';
import {useQuery} from 'react-query';
import {useDebounce} from 'use-debounce';
import {searchCountries} from '../services/api.js';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  let {data: searchResults, isLoading} = useQuery(
    ['searchResults', debouncedSearchQuery],
    async () => {
      if (debouncedSearchQuery && debouncedSearchQuery.trim() === '') {
        return [];
      }
      return searchCountries(debouncedSearchQuery);
    }
  );

  searchResults = searchResults?.map((result) => result.item);
  return {searchQuery, setSearchQuery, searchResults, isLoading};
}
