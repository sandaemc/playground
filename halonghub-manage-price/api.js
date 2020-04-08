
export const getRooms = cruiseId => $.get(`/manage-price/rooms/${cruiseId}`);

export const getCruises = () => $.get('/manage-price/cruises');

export const getTourTypes = () => $.get('/manage-price/tour-types');

export const getPrices = filter => {
    const query = $.param(filter);
    return $.get(`/manage-price/prices?${query}`);
};

export const postPrices = prices => 
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(prices),
        dataType: 'json',
        type: 'POST',
        url: '/manage-price/prices'
    });