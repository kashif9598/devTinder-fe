import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL + url, { withCredentials: true });
        console.log("in useFetch data receivved", res.data)
        setData(res.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || "Something went wrong");
        } else {
          setError("Network error, Please try again");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
