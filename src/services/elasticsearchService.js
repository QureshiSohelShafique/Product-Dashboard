import axios from 'axios';

const ES_URL = 'http://localhost:9200/products/_search';

export const fetchProducts = async () => {
  try {
    const response = await axios.post(ES_URL, {
      query: {
        match_all: {}
      }
    });
    return response.data.hits.hits; // return the hits (the documents)
  } catch (error) {
    console.error('Error fetching data from Elasticsearch:', error);
    return [];
  }
};
