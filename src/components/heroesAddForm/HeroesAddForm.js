import {  useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addHeroes } from "../../actions";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');
    const {request} = useHttp();
    const { filters } = useSelector(state => state.filters)
    const dispatch = useDispatch();

    const addHendlerHero = (e) => {
        e.preventDefault()

        const newHero = {
            id:uuidv4(),
            name: name,
            description:description,
            element: element
        }

        // dispatch(addHeroes(newHero))
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(data => dispatch(addHeroes(data)))
            .catch(err => console.log(err))


        setName('')
        setDescription('')
        setElement('')
    }

    const renderFilters = (filters) => {
        if (filters && filters.length > 0 ) {

            return filters.map(({name, label}) => {
                if (name === 'all')  return;
                return <option key={name} value={name}>{label}</option>
            })

        }

    }
    
    return (
        <form onSubmit={addHendlerHero} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={name} 
                    placeholder="Как меня зовут?"
                    onChange={(e) => setName(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text"
                    value={description} 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setDescription(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    value={element} 
                    name="element"
                    onChange={(e) => setElement(e.target.value)}
                    >
                    <option >Я владею элементом...</option>
                    {renderFilters(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;