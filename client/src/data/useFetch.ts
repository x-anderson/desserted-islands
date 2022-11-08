import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8888/api" });

export const useFetch = (endPoint: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(endPoint);
        setData(data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [endPoint]);

  return { data, loading, error };
};
