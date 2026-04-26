export type ExchangeRates = Record<string, number>;

type ExchangeRatesResponse = {
  result: string;
  conversion_rates: ExchangeRates;
};

const EXCHANGE_RATE_BASE_URL = 'https://v6.exchangerate-api.com/v6';

export async function getExchangeRates(): Promise<ExchangeRates> {
  const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY as string;
  const response = await fetch(`${EXCHANGE_RATE_BASE_URL}/${apiKey}/latest/USD`);
  if (!response.ok) {
    throw new Error(`Exchange rates fetch failed: ${response.status}`);
  }
  const data = (await response.json()) as ExchangeRatesResponse;
  return data.conversion_rates;
}
