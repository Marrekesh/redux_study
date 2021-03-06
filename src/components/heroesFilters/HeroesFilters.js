import {  useDispatch, useSelector } from "react-redux";
import { filtersFetched, changeActiveFilter, filtersFetching } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import classNames from "classnames";
import Spinner from '../spinner/Spinner'

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    
    const {request} = useHttp()
    const dispatch = useDispatch()
    const {filters, activeFilter, filtersLoadingStatus} = useSelector(state => state.filters)

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .then(error => console.log(error))
    },[])

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const createFilters = (filters) => {

        if (filters.length === 0) {
            return <h5 className="text-center mt-5" > Фильтры не найдены</h5>
        }

        return filters.map(({name, label, className}) => {
            
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            })


            return <button 
            key={name} 
            id={name} 
            className={btnClass}
            onClick={() => dispatch(changeActiveFilter(name))}
            >
            {label}</button>
        })

    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {createFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;