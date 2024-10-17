import type { Position } from '../types';

export function createTransform(searchText: string): (positions: Array<Position>) => Array<Position> {
  const normalizedSearchText = searchText.trim().toLowerCase();

  return (positions: Array<Position>): Array<Position> => {
    if (!normalizedSearchText) {
      return positions
    }

    return positions
      .filter(position => {
        const tickerMatch = position.ticker.toLowerCase().startsWith(normalizedSearchText);
        const nameMatch = position.name.toLowerCase().includes(normalizedSearchText);
        return tickerMatch || nameMatch;
      })
      .sort((a, b) => {
        const aTicker = a.ticker.toLowerCase();
        const bTicker = b.ticker.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const aTickerExactMatch = aTicker === normalizedSearchText;
        const bTickerExactMatch = bTicker === normalizedSearchText;
        if (aTickerExactMatch && !bTickerExactMatch) return -1;
        if (!aTickerExactMatch && bTickerExactMatch) return 1;

        const aTickerStartsWith = aTicker.startsWith(normalizedSearchText);
        const bTickerStartsWith = bTicker.startsWith(normalizedSearchText);
        if (aTickerStartsWith && !bTickerStartsWith) return -1;
        if (!aTickerStartsWith && bTickerStartsWith) return 1;

        const aNameStartsWith = aName.startsWith(normalizedSearchText);
        const bNameStartsWith = bName.startsWith(normalizedSearchText);
        if (aNameStartsWith && !bNameStartsWith) return -1;
        if (!aNameStartsWith && bNameStartsWith) return 1;

        const aNameContains = aName.includes(normalizedSearchText);
        const bNameContains = bName.includes(normalizedSearchText);
        if (aNameContains && !bNameContains) return -1;
        if (!aNameContains && bNameContains) return 1;

        return 0;
      });
  };
}
