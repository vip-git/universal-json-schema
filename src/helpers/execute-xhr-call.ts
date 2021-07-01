const executeXHRCall = ({
  type,
  url,
  method,
  payload,
  onSuccess,
  onFailure,
}: any) => {
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
    .then((res) => {
      if (!res.ok) {
        return res.json().then((text) => typeof onFailure === 'function' && onFailure(res.status, text));
      } 
      return res.json();
    })
    .then((xhrData) => typeof onSuccess === 'function' && onSuccess(xhrData))
    .catch(
      (error) => typeof onFailure === 'function' 
      && onFailure(
        String(error) === 'TypeError: Failed to fetch' ? 999 : 911, 
        error
      )
    );
};

export default executeXHRCall;
