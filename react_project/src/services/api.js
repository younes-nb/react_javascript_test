const BASE_API = "http://localhost:3000/"

export async function searchCountries(query) {
  const response = await fetch(`${BASE_API}?q=${query}`);
  const data = await response.json();
  return data.data.results;
}

export async function fetchCurrencyData(countryCode) {
  const response = await fetch(`${BASE_API}chart/${countryCode}`);
  const data = await response.json();
  return data.data;
}
