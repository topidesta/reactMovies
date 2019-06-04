const apiKey = '7adc050ac3dbfd5b20b100f6b6745fc4';

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
    return 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&page=' + page + '&query=' + escape(query);
}

const queryDetail = query => {
    return 'https://api.themoviedb.org/3/movie/' + query + '?api_key=' + apiKey;
}

const queries = (type, query, page) => {
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
            }
            break;
        case 'SEARCH':
            return querySearch(query, page);
        case 'DETAIL':
            return queryDetail(query);
        default:
    }
}

const request = (type, query, page, callbackOK, callbackError) => {
    fetch(queries(type, query, page))
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

const poster = (url, size) => {
    if (!url) return '';
    return 'https://image.tmdb.org/t/p/w' + size + url;
}

export default { request, poster };