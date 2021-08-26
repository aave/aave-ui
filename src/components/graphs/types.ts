export type GraphPoint = [string | number, number];

export type InterestRateSeries = {
  name: string;
  data: GraphPoint[];
};

export type InterestRateGraphProps = {
  seriesData: InterestRateSeries[];
};
