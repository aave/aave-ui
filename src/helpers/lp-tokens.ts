const isBPTPool = (symbol: string) => /^BPT.+/.test(symbol);
const isUNIPool = (symbol: string) => /^UNI.+/.test(symbol);

export const getLPTokenPoolLink = (poolReserve: { symbol: string; underlyingAsset: string }) => {
  if (isBPTPool(poolReserve.symbol))
    return `https://pools.balancer.exchange/#/pool/${poolReserve.underlyingAsset}/`;
  if (isUNIPool(poolReserve.symbol))
    return `https://v2.info.uniswap.org/pair/${poolReserve.underlyingAsset}`;
  return null;
};
