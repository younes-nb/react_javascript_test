import {TextField, CircularProgress} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import DynamicTable from '../../components/dynamic-table/dynamic-table.jsx';
import styles from './search-bar.module.css';
import Chart from 'chart.js/auto';
import {useSearch} from '../../utils/use-search.js';
import {QueryClient, QueryClientProvider} from "react-query";
import {getCurrencyDataPoint} from "../../utils/currency-data.js";

const queryClient = new QueryClient();
const SearchBar = () => {
  const tableColumns = [
    {Header: 'کد', accessor: 'code'},
    {Header: 'کشور', accessor: 'name'},
  ];

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
  } = useSearch();

  const [currencyData, setCurrencyData] = useState([]);
  const [countryCode, setCountryCode] = useState(null);
  const chartRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: currencyData.map((point) => point.x),
        datasets: [
          {
            label: `Fictional Currency Value of ${countryCode}`,
            data: currencyData.map((point) => point.y),
            borderColor: 'rgb(89, 65, 205)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time',
            },
            ticks: {
              precision: 0,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Currency Value',
            },
          },
        },
      },
    });

    let intervalId = null;

    const updateChart = async () => {
      if (
        currencyData.length === 0 ||
        currencyData.length >= 20 ||
        !countryCode
      )
        return;

      try {
        const currencyDataPoint = await getCurrencyDataPoint(countryCode);
        setCurrencyData((prevData) => [...prevData, currencyDataPoint]);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    intervalId = setInterval(updateChart, 1000);

    return () => {
      clearInterval(intervalId);
      chart.destroy();
    };
  }, [currencyData, countryCode]);

  let textFieldColor = 'primary';
  if (searchQuery && searchQuery.trim() !== '') {
    if (isLoading) {
      textFieldColor = 'info';
    } else if (Array.isArray(searchResults) && searchResults.length > 0) {
      textFieldColor = 'success';
    } else {
      textFieldColor = 'warning';
    }
  }

  const handleRowClick = async (row) => {
    setCountryCode(row.code);
    setCurrencyData([await getCurrencyDataPoint(row.code)]);
  };

  return (
    <div className="container">
      <TextField
        className={styles.searchBar}
        type="search"
        value={searchQuery}
        onChange={handleInputChange}
        label="Search countries..."
        variant="filled"
        color={textFieldColor}
      />
      <div className={styles.result}>
        {isLoading ? (
          <CircularProgress/>
        ) : searchResults.length > 0 ? (
          <div className={styles.resultContainer}>
            <div className={styles.tableContainer}>
              <DynamicTable
                data-testid="table"
                columns={tableColumns}
                data={searchResults}
                onRowClick={handleRowClick}
                selectedRow={countryCode}
              />
            </div>
            <div className={styles.chartContainer}>
              {currencyData.length > 0 ? (
                <canvas ref={chartRef} className={styles.chart}/>
              ) : (
                <p className={styles.nothingToShow}>
                  Select a country to see the fictional currency values of it.
                </p>
              )}
            </div>
          </div>
        ) : searchQuery.trim() !== '' ? (
          <p className={styles.noResults}>No results found.</p>
        ) : (
          <p className={styles.nothingToShow}>Nothing to show.</p>
        )}
      </div>
    </div>
  );
};

const SearchBarApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchBar/>
    </QueryClientProvider>
  );
};
export default SearchBarApp;
