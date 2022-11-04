import {useState, useEffect} from 'react';
import axios from 'axios';
const useFetch = (url: string, body: any) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      axios({
        method: 'POST',
        url: url,
        data: body,
      }).then(res => setData(res.data));
    } catch {
      console.log('Failed to fetch API.');
    }
  }, [url, body]);

  return [data];
};

export default useFetch;
