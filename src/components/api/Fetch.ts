export const fetchData = async (url: string, getAccessTokenSilently: any) => {
  const response = await fetch(url);
  const dataJSON = await response.json();
  return dataJSON;
};
