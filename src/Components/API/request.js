/**
 * This component makes all the fetchs to themoviedb
 */ 


// Api Key
const apiKey = '7adc050ac3dbfd5b20b100f6b6745fc4';

/**
 * Calls to themoviedb
 */

const queryPopularMovies = page => {
    return 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&page=' + page;
}

const queryPopularSeries = page => {
    return 'https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&page=' + page;
}

const queryFamily = page => {
    return 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&page=' + page + '&with_genres=10751';
}

const queryDocumentary = page => {
    return 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&page=' + page + '&with_genres=99';
}

const querySearch = (query, page) => {
    return query?'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&page=' + page + '&query=' + escape(query):null;
}

const queryDetail = query => {
    return query?'https://api.themoviedb.org/3/movie/' + query + '?api_key=' + apiKey:null;
}

/**
 * Creates the query taking care of arguments:
 * 
 * @param {*} type 'LIST' / 'SEARCH' / 'DETAIL'
 * @param {*} query search query for SEARCH, Film ID for DETAIL, or for LIST: 'POPULAR_MOVIES' / 'POPULAR_SERIES' / 'FAMILY' / 'DOCUMENTARY'
 * @param {*} page The page results.
 */

const queries = (type, query, page=1) => {
    switch (type) {
        case 'LIST':
            switch (query) {
                case 'POPULAR_MOVIES':
                    return queryPopularMovies(page);
                case 'POPULAR_SERIES':
                    return queryPopularSeries(page);
                case 'FAMILY':
                    return queryFamily(page);
                case 'DOCUMENTARY':
                    return queryDocumentary(page);
                default:
                    return null;
            }
        case 'SEARCH':
            return querySearch(query, page);
        case 'DETAIL':
            return queryDetail(query);
        default:
            return null;
    }
}

/**
 * Fetch the results.
 * 
 * @param {*} type 'LIST' / 'SEARCH' / 'DETAIL'
 * @param {*} query search query for SEARCH, Film ID for DETAIL, or for LIST: 'POPULAR_MOVIES' / 'POPULAR_SERIES' / 'FAMILY' / 'DOCUMENTARY'
 * @param {*} page The page results.
 * @param {*} callbackOK Callback when done ok
 * @param {*} callbackError Callback when fails
 */

const request = (type, query, page, callbackOK, callbackError) => {
    const actualQuery=queries(type, query, page);
    if (!actualQuery) return callbackOK([]);
    fetch(actualQuery)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            callbackOK(json);
        })
        .catch(function (error) {
            callbackError(error);
        });
}

/**
 * Returns the absolute url of an image
 * 
 * @param {} url The url as received by themoviedb api.
 * @param {*} size The size of the image.
 */

const poster = (url, size) => {
    if (!url) return '';
    return 'https://image.tmdb.org/t/p/w' + size + url;
}

export default { request, poster };