const URL = 'https://covid-api.com/api';

export const getGlobalStatistics = (date?: string, country?: string,) => {
  const dateParam = date ? `?date=${date}` : '';
  const isoParam = country ? `&iso=${country}` : '';
  return fetch(`${URL}/reports/total${dateParam}${isoParam}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.clone().json();
    })
    .catch(error => {
      console.error('Error fetching statistics:', error);
    });
};

export const getCountryList = () => {
  return fetch(`${URL}/regions`)
    .then(response => {
      console.log(response, 'response')
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.clone().json();
    })
    .catch(error => {
      console.error('Error fetching regions:', error);
    });
}
