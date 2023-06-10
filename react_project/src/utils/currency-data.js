import {fetchCurrencyData} from "../services/api.js";

export async function getCurrencyDataPoint(countryCode) {
  const {x, y} = await fetchCurrencyData(countryCode);
  return {x, y};
}