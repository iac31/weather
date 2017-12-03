import axios from 'axios';

export const getData = () =>
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09w1gY3UgnKDweZNE4ZHwtAo3Go9RhUPIQ&q=Bucharest`)
        .then(res => res.data)
        .catch(err => console.log(`Check the error ${err}`));

export const getLocationName = () =>
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=44.453529,26.041891&key=AIzaSyDkv3JKsB__r75VpVNt5XP-HNzbBDC5anQ')
        .then(res => res.data)
        .catch(err => console.log(`Check the error ${err}`));
