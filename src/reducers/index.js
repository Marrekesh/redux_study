const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    activeFilter: 'all',
    filters: [],
    filteredHeroes:[],
    filtersLoadingStatus: 'idle'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ? 
                                action.payload : 
                                action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                state.heroes:
                                state.heroes.filter(item => item.element === action.payload) 
            }
        case 'HEROES_ADD':
            let newHeroList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.activeFilter === 'all' ? 
                                newHeroList : 
                                newHeroList.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_DELET':
            let newDeletedHeroList = state.heroes.filter(item => item.id !== action.payload)
            return {
                ...state,
                heroes: newDeletedHeroList,
                filteredHeroes: state.activeFilter === 'all' ? 
                                newDeletedHeroList : 
                                newDeletedHeroList.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;