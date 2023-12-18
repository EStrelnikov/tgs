import { FILTERS, SORT } from "./constans";

export function sortData(type, data) {
  if (!data || !data.length) return data;
  if (!data.length) return data;
  switch (type) {
    case SORT.increase:
      return [...data].sort((a, b) => {
        return (
          a.flight.price.passengerPrices[0].singlePassengerTotal.amount -
          b.flight.price.passengerPrices[0].singlePassengerTotal.amount
        );
      });

    case SORT.decrease:
      return [...data].sort((a, b) => {
        return (
          b.flight.price.passengerPrices[0].singlePassengerTotal.amount -
          a.flight.price.passengerPrices[0].singlePassengerTotal.amount
        );
      });

    case SORT.time:
      return [...data].sort((a, b) => {
        const durA = a.flight.legs.reduce((acc, el) => acc + el.duration, 0);
        const durB = b.flight.legs.reduce((acc, el) => acc + el.duration, 0);
        return durA - durB;
      });

    default:
      return data;
  }
}

export function filtersPrice(data, filters) {
  if (!filters) return data;
  if (!data.length) return data;
  return data.filter((el) => {
    const ticketPrice =
      el.flight.price.passengerPrices[0].singlePassengerTotal.amount;
    let { max, min } = filters;
    if (Number(min) >= Number(max)) return false;
    return ticketPrice > Number(min) && ticketPrice < Number(max);
  });
}

export function companiesFilter(data, filters) {
  if (!filters || !filters.length) return data;
  if (!data.length) return data;
  return data.filter((el) => filters.indexOf(el.flight.carrier.caption) !== -1);
}

export function filtersChange(data, filters) {
  if (!filters || !filters.length) return data;
  if (!data.length) return data;
  return data.filter((el) => {
    const first = el.flight.legs[0].segments.length;
    const firstValue =
      first === 1 ? FILTERS.null : first === 2 ? FILTERS.one : FILTERS.two;
    const second = el.flight.legs[1].segments.length;
    const secondValue =
      second === 1 ? FILTERS.null : second === 2 ? FILTERS.one : FILTERS.two;
    return (
      filters.indexOf(firstValue) !== -1 || filters.indexOf(secondValue) !== -1
    );
  });
}
