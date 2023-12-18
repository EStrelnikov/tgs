import ticketsStore from "../../strore/ticketsStore";
import TicketItem from "../TicketItem";
import { observer } from 'mobx-react-lite';


import classes from "./TicketsList.module.scss";


const TicketsList = observer(() => {
    const { tickets, isLoading } = ticketsStore;

    if (isLoading) {
        return (<div className={classes.loading}>Loading...</div>)
    }

    if (!tickets.length) {
        return (<div className={classes.empty}>Билетов нет</div>)
    }
  
    return (
        <div className={classes.component}>
            {
                tickets.map(el => <TicketItem key={el.flightToken} item={el} />)
            }
            <button className={classes.btn} onClick={() => ticketsStore.getMoreTickets()}>Показать еще</button>
        </div>
     )
})

export default TicketsList;