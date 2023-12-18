import { useEffect } from "react";
import FiltersMenu from "../../FiltersMenu";
import TicketsList from "../../TicketsList";


import classes from "./Tickets.module.scss";
import ticketsStore from "../../../strore/ticketsStore";

const Tickets = () => {
    useEffect(() => {
        ticketsStore.getAllTickets();
    }, [])
  return (
    <div className={classes.component}>  
        <FiltersMenu />
        <TicketsList />
    </div>
  )
}

export default Tickets;