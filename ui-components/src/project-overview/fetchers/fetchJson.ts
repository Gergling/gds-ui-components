export const fetchJson = async <T>(url: string): Promise<T> => {
  const data = await fetch(url);
  const json: T = await data.json();
  return json;
};
