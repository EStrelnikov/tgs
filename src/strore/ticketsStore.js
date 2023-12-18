import { makeAutoObservable } from "mobx";
import ticketsStoreService from "./ticketsStore.service";

class TicketsStore {
  constructor() {
    this.isLoading = true;
    this.isError = false;
    this.tickets = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAllTickets(params) {
    this.isLoading = true;
    this.isError = false;
    try {
      let flights = await ticketsStoreService.getAllTickets(params);
      this.tickets = flights;
    } catch (error) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  async getMoreTickets() {
    this.isError = false;
    try {
      let flights = await ticketsStoreService.getMoreTickets(
        this.tickets.length
      );
      this.tickets = flights;
    } catch (error) {
      this.isError = true;
    }
  }
}

export default new TicketsStore();
