export const fetchData = async (url: string) => {
  const response = await fetch(url);
  const dataJSON = await response.json();
  return dataJSON;
};
