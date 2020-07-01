import React from "react";

const useFetch = <T>(url: string): T | any => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    console.log("running with ", url);
    const fetchData = async () => {
      const res = await fetch(url);
      const dataRes = await res.json();
      setData(dataRes);
    };
    fetchData();
  }, []);
  return data;
};

export default useFetch;
