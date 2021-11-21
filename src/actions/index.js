export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = (filters) => {
    return {
        type: 'FILTERS_FETCHING',
        payload: filters
    }
}

export const addHeroes = (newHeroes) => {
    return {
        type: 'HEROES_ADD',
        payload: newHeroes
    }
}