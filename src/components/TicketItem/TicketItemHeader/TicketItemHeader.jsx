import classes from "./TicketItemHeader.module.scss";

const TicketItemHeader = ({ carrier, price }) => {
  return (
    <div className={classes.component}>
        <div className={classes.carrier}>
            <img
                src={`https://www.skyscanner.net/images/airlines/small/${carrier.airlineCode}.png`}
                alt={carrier.airlineCode}/>
        </div>
        <div className={classes.cost}>
            <span>
                {Math.round(price.passengerPrices[0].singlePassengerTotal.amount).toLocaleString()}
                &nbsp;
                {price.passengerPrices[0].singlePassengerTotal.currency}
            </span>
            <div className={classes.text}>Стоимость расчитана на одного взрослого пассажира</div>
        </div>
    </div>
  )
}

export default TicketItemHeader;