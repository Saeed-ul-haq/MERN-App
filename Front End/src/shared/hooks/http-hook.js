import React, { useState, useCallback } from "react";

export default function useHttpClient() {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState();

  const sentRequest = useCallback(
    (url, method = "GET", headers = {}, body = null) => {
      setisLoading(true);
      fetch(url, {
        method,
        body,
        headers,
      }).then(response => response.json())
        .then((res) => {
          setisLoading(false);
          if (!res.ok) {
            const error = new Error(res.message);
          }
          return res;
        })
        .catch((err) => {
            seterror(err.message)
            setisLoading(false)
        });
    },
    []
  );

  const clearError = () => {
      seterror(null)
  }

  return { isLoading, error, sentRequest,clearError };
}
