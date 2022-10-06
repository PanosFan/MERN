import axios from "axios";
import { useState, useEffect } from "react";

const useAxios = ({ method = "GET", url, payload = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .request({
        data: payload,
        signal: controller.signal,
        method,
        url,
      })
      .then((response) => {
        setLoading(false);
        setResponse(response);
        console.log(response);
      })
      .catch((error) => {
        if (error.message !== "canceled") {
          setLoading(false);
          setError(error.message);
          console.log(error);
        }
      });

    return () => controller.abort();
  }, [url, payload, method]);
  return { response, error, loading };
};

export default useAxios;
