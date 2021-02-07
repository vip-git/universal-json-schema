const executeXHRCall = ({
  type,
  url,
  method,
  payload,
  callback,
}) => {
  const options = {
    method, // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(payload || {}), // body data type must match "Content-Type" header
  };
  // eslint-disable-next-line no-undef
  const fetchData = (method === 'GET') ? fetch(url) : fetch(url, options);
  return fetchData
    .then((res) => res.json())
    .then((xhrData) => callback(xhrData));
};

export default executeXHRCall;
