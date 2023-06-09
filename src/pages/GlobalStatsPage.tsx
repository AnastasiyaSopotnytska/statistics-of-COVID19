import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, Container } from '@mui/material';
import { getCountryList, getGlobalStatistics } from '../api/api';
import { GlobalStatisticsType } from '../types/types';
import Chart from '../components/Chart';


const GlobalStats: React.FC = () => {
  const [globalData, setGlobalData] = useState<GlobalStatisticsType>();
  const [regions, setRegions] = useState<string[]>();
  const [data, setData] = useState<GlobalStatisticsType[]>([]);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    country: '',
  });
  const [errors, setErrors] = useState({
    dateFrom: false,
    dateTo: false,
    country: false,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
      dateFrom: urlParams.get('dateFrom') || localStorage.getItem('dateFrom') || '2023-03-09',
      dateTo: urlParams.get('dateTo') || localStorage.getItem('dateTo') || '2023-03-09',
      country: urlParams.get('country') || localStorage.getItem('country') || '',
    };

    const newFilters = {
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
      country: params.country,
    };

    setFilters(newFilters);

    localStorage.setItem('dateFrom', params.dateFrom);
    localStorage.setItem('dateTo', params.dateTo);
    localStorage.setItem('country', params.country);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(filters as any);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [filters]);

  useEffect(() => {
    getGlobalStatistics()
      .then((data) => {
        setGlobalData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching global statistics:', error);
      });

    getCountryList()
    .then((data) => {
      const list = data.data.map((item: { name: string; iso: string }) => [item.name, item.iso]);
      setRegions(list);
    })
      .catch((error) => {
        console.error('Error fetching global statistics:', error);
      });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (regions?.length !== 0 && filters.country?.length !== 0) {
      regions?.some(country => country.toLowerCase() === filters.country.toLowerCase())
      ? setErrors({ ...errors, country: false })
      : setErrors({ ...errors, country: true })
    }

    try {
      const responseFromDate = await getGlobalStatistics(filters.dateFrom, filters.country);
      const responseToDate = await getGlobalStatistics(filters.dateTo, filters.country);

      if (responseFromDate.data.length === 0) {
        setErrors({ ...errors, dateFrom: true });
        return;
      }

      if (responseToDate.data.length === 0) {
        setErrors({ ...errors, dateTo: true });
        return;
      }

      setData([responseFromDate.data, responseToDate.data]);
      setErrors({ ...errors, dateTo: false });
      setErrors({ ...errors, dateFrom: false })
    } catch (error) {
      console.error('Error fetching global statistics:', error);
    }
  };

  return (
    <div className='page'>
      <h2>Global Statistics</h2>
      {globalData && (
        <>
          <Box sx={{ mb: 4 }}>
            <div className='GlobalStatisctic'>
              <div>Last update: {globalData.last_update}</div>
              <div>Fatality rate: {globalData.fatality_rate}</div>
            </div>
          </Box>
        </>
      )}
      <Box sx={{ mb: 2 }}>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            name="dateFrom"
            label="Date From"
            defaultValue={'2023-03-09'}
            type="date"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            inputProps={{ max: new Date().toISOString().split('T')[0] }}
          />
          <TextField
            name="dateTo"
            label="Date To"
            type="date"
            defaultValue={'2023-03-09'}
            value={filters.dateTo}
            onChange={handleFilterChange}
            inputProps={{ max: new Date().toISOString().split('T')[0] }}
          />
          <TextField
            name="country"
            label="Country"
            value={filters.country}
            onChange={handleFilterChange}
          />
          <Button type="submit" variant="contained">
            Apply Filters
          </Button>
        </form>
      </Box>
      {errors.dateFrom && (
        <div className='error'>
          NO DATA FOR dateFrom
        </div>
      )}
      {errors.dateTo && (
        <div className='error'>
          NO DATA FOR dateTo
        </div>
      )}
      {(data.length !== 0 && !errors.dateFrom && !errors.dateTo) && (
        <div style={{ width: '80%', maxWidth: '80%' }}>
          <Chart data={data} />
        </div>
      )}
    </div>
  );
};

export default GlobalStats;
