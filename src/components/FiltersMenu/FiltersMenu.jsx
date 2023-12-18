import { useEffect, useState } from "react";


import classes from "./FiltersMenu.module.scss";
import { FILTERS, SORT } from "../../utils/constans";
import ticketsStoreService from "../../strore/ticketsStore.service";
import ticketsStore from "../../strore/ticketsStore";


const FiltersMenu = () => {
    const [valueInputSort, setValueInputSort] = useState("increase");
    const [valueInputFilter, setValueInputFilter] = useState([]);
    const [valueInputCost, setValueInputCost] = useState({
        min: 0,
        max: 100000
    });
    const [valueInputCompanies, setValueInputCompanies] = useState([]);
    const params = {
        cost: valueInputCost,
        companies: valueInputCompanies,
        filters: valueInputFilter,
        sort: valueInputSort,
        offset: 0
    }

    useEffect(() => {
        if (ticketsStore.isLoading) return
        ticketsStore.getAllTickets(params)
    }, [ valueInputSort, valueInputFilter, valueInputCost, valueInputCompanies ])

    const handleChangeSort = (e) => {
        setValueInputSort(e.target.value);
    }

    const handleChangeFilter = (e) => {
        const {checked, name} = e.target;
        setValueInputFilter(prev => checked ? [...prev, name] : prev.filter(el => el !== name));
    }

    const handleChangeCost = (e) => {
        const { id, value } = e.target;
        if (id === "min" && value >= valueInputCost.max) return
        if (id === "max" && value <= valueInputCost.min) return
        setValueInputCost(prev => ({ ...prev, [id]: value }))
    }

    const handleChangeCompanies = (e) => {
        const {checked, name} = e.target;
        setValueInputCompanies(prev => checked ? [...prev, name] : prev.filter(el => el !== name));
    }

  return (
    <div className={classes.component}>
        <div className={classes.sort}>
            <div className={classes.title}>Сортировать</div>
            <div>
                <label htmlFor={SORT.increase}>
                    <input 
                        type="radio" 
                        name="sort" 
                        value={SORT.increase}
                        checked={valueInputSort === SORT.increase} 
                        id={SORT.increase}
                        onChange={(e)=> handleChangeSort(e)}
                    />
                    - по возрастанию цены
                </label>
            </div>
            <div>
                <label htmlFor={SORT.decrease}>
                    <input 
                        type="radio" 
                        name="sort" 
                        value={SORT.decrease} 
                        checked={valueInputSort === SORT.decrease} 
                        id={SORT.decrease}
                        onChange={(e)=> handleChangeSort(e)}
                    />
                    - по убыванию цены
                </label>
            </div>           
            <div>
                <label htmlFor={SORT.time}>
                    <input 
                        type="radio" 
                        name="sort" 
                        value={SORT.time}
                        checked={valueInputSort  === SORT.time} 
                        id={SORT.time}
                        onChange={(e)=> handleChangeSort(e)}
                    />
                    - по времени в пути
                </label>
            </div> 
        </div>
        <div className={classes.filter}>
            <div className={classes.title}>Фильтровать</div>
            <div>
                <div>
                    <label htmlFor={FILTERS.null}>
                        <input 
                            type="checkbox"
                            name={FILTERS.null}
                            value={FILTERS.null}
                            checked={valueInputFilter.includes(FILTERS.null)} 
                            id={FILTERS.null}
                            onChange={(e)=> handleChangeFilter(e)}
                        />
                        - без пересадок
                    </label>
                </div>
                <div>
                    <label htmlFor={FILTERS.one}>
                        <input 
                            type="checkbox"
                            name={FILTERS.one}
                            value={FILTERS.one}
                            checked={valueInputFilter.includes(FILTERS.one)} 
                            id={FILTERS.one}
                            onChange={(e)=> handleChangeFilter(e)}
                        />
                        - 1 пересадка
                    </label>
                </div>
                <div>
                    <label htmlFor={FILTERS.two}>
                        <input 
                            type="checkbox"
                            name={FILTERS.two}
                            value={FILTERS.two}
                            checked={valueInputFilter.includes(FILTERS.two)} 
                            id={FILTERS.two}
                            onChange={(e)=> handleChangeFilter(e)}
                        />
                        - 2 пересадки
                    </label>
                </div>
                
            </div>
        </div>
        <div className={classes.cost}>
            <div className={classes.title}>Цена</div>
            <div className={classes.items}>
                <div>
                    <label htmlFor="min">
                        От
                        <input 
                            type="number" 
                            id="min" 
                            value={valueInputCost.min}
                            onChange={(e) => handleChangeCost(e)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="max">
                        До
                        <input 
                            type="number" 
                            id="max" 
                            value={valueInputCost.max}
                            onChange={(e) => handleChangeCost(e)}
                        />
                    </label>
                </div>
            </div>
            
        </div>

        <div className={classes.companies}>
            <div className={classes.title}>Авиакомпании</div>
            {
                ticketsStoreService.getAirlines().map(name => (
                    <div
                        key={crypto.randomUUID()}
                    >
                        <label htmlFor={name}>
                            <input 
                                type="checkbox"
                                name={name}
                                checked={valueInputCompanies.includes(name)}
                                onChange={(e) => handleChangeCompanies(e)}
                                id={name}
                            />
                            - { name }
                        </label>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default FiltersMenu;