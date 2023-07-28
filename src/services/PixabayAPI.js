import axios from 'axios';

const API_KEY = '38520819-debf8b7190981ec5853d7e61f';

const pageLimit = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const { data } = await axios({
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageLimit,
      page: page,
    },
  });
  return data;
};
