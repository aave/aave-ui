export interface CurrencyRouteParamsInterface {
  currencySymbol: string;
  id?: string;
}
export const CURRENCY_ROUTE_PARAMS = ':currencySymbol([A-Z]+)(-?):id?';
