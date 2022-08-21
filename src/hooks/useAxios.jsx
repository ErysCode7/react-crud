import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
        setError("");
      } catch (err) {
        setError(err.message);
        setData([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      getData(url);
    }, 2000);
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
