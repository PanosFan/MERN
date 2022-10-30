import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = ({ method = "GET", url, auth }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const controller = new AbortController();
      axios
        .request({
          method,
          url,
          signal: controller.signal,
          headers: {
            "auth-token": auth,
          },
        })
        .then((response) => {
          setResponse(response);
        })
        .catch((error) => {
          if (error.message !== "canceled") {
            setError(error.message);
          }
        });

      return () => controller.abort();
    }, 1500);
  }, []);
  return { response, error };
};

export default useAxios;
