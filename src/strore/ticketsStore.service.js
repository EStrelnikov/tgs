import { result } from "../mockData/flights.json";
import { SORT } from "../utils/constans";
import {
  filtersPrice,
  companiesFilter,
  filtersChange,
  sortData,
} from "../utils/functions";
let limit = 10;
class TicketsService {
  constructor() {
    this.params = {};
  }
  async getAllTickets(params = { offset: 0, sort: SORT.increase }) {
    this.params = params;
    let data = [...result.flights];
    data = companiesFilter(data, params.companies);
    data = filtersChange(data, params.filters);
    data = filtersPrice(data, params.cost);
    data = sortData(params.sort, data);
    data.length = data.length
      ? data.length > limit + params.offset
        ? limit + params.offset
        : data.length
      : 0;
    return data;
  }

  async getMoreTickets(length) {
    this.params.offset = length;
    let data = [...result.flights];
    data = filtersPrice(data, this.params.cost);
    data = companiesFilter(data, this.params.companies);
    data = filtersChange(data, this.params.filters);
    data = sortData(this.params.sort, data);
    data.length = data.length
      ? data.length > limit + this.params.offset
        ? limit + this.params.offset
        : data.length
      : 0;
    return data;
  }

  getAirlines() {
    const data = [...result.flights];
    return [...new Set(data.map((el) => el.flight.carrier.caption))];
  }
}

export default new TicketsService();
