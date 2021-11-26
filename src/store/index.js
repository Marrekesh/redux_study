
import heroes from '../components/heroesList/heroesSlice'
import filters from '../reducers/filters'
import {configureStore} from '@reduxjs/toolkit'

// const store = createStore(combineReducers({heroes, filters}), applyMiddleware(ReduxThunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;