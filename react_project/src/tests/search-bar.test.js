import {render, screen, fireEvent} from '@testing-library/react';
import SearchBar from '../components/search-bar/search-bar.jsx';
import {QueryClient, QueryClientProvider} from "react-query";

jest.mock('../utils/use-search', () => ({
  useSearch: () => ({
    searchResults: [
      {code: '1', name: 'Country 1'},
    ],
    isLoading: false,
    searchQuery: "country"
  }),
}));

describe('SearchBar', () => {
  test('displays search results in the table', async () => {
    const queryClient = new QueryClient();
    render(<QueryClientProvider client={queryClient}>
      <SearchBar/>
    </QueryClientProvider>);

    const searchInput = screen.getByLabelText('Search countries...');
    fireEvent.change(searchInput, {target: {value: 'country'}});

    const cells = screen.getAllByRole('cell');

    expect(cells.length).toBe(2);
    expect(cells[0].textContent).toBe('1');
    expect(cells[1].textContent).toBe('Country 1');
  });
});