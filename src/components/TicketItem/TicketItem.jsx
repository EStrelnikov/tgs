import TicketItemFlight from "./TicketItemFlight";
import TicketItemHeader from "./TicketItemHeader";

import classes from "./TicketItem.module.scss";

const TicketItem = ({ item }) => {
    const {carrier, price, legs} = item.flight;
    return (
        <div className={ classes.component }>
            <TicketItemHeader 
                carrier={ carrier } 
                price={ price }     
            />
            {
                legs.map(leg => <TicketItemFlight key={crypto.randomUUID()} leg={ leg } />)
            }
            <button className={classes.btnSelected} onClick={() => alert("Дейтсвие")}>ВЫБРАТЬ</button>
        </div>
    )
}

export default TicketItem;