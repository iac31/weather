import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import Search from './components/Search';
import Location from './components/Location';
import LocalTime from './components/LocalTime'
import Navigation from './components/Navigation';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';

import chanceRain from './icons/weather/chancerain.svg';
import clear from './icons/weather/clear.svg';
import cloudy from './icons/weather/cloudy.svg';
import flurries from './icons/weather/flurries.svg';
import fog from './icons/weather/fog.svg';
import mostlyCloudy from './icons/weather/mostlycloudy.svg';
import mostlySunny from './icons/weather/mostlysunny.svg';
import partlyCloudy from './icons/weather/partlycloudy.svg';
import rain from './icons/weather/rain.svg';
import sleet from './icons/weather/sleet.svg';
import snow from './icons/weather/snow.svg';
import sunny from './icons/weather/sunny.svg';
import tStorms from './icons/weather/tstorms.svg';
import unknown from './icons/weather/unknown.svg';

//not used imports
/*import partlySunny from './icons/weather/partlysunny.svg';
import chanceSleet from './icons/weather/chancesleet.svg';
import chanceSnow from './icons/weather/chancesnow.svg';
import chanceFlurries from './icons/weather/chanceflurries.svg';
import hazy from './icons/weather/hazy.svg';*/

import current from './current.json';
import hourly from './hourly.json';
import daily from './daily.json';

class App extends Component {
    constructor() {
        super();
        this.state = {
            geoJson: {
                results: {
                    2: {
                        address_components: {
                            1: {
                                short_name: ''
                            },
                            3: {
                                short_name: ''
                            }
                        }
                    },
                }
            },
            // searchJson: [
            //     {
            //         AdministrativeArea: {
            //             countryID: '',
            //             EnglishName: '',
            //             ID: ''
            //         },
            //         Key: '',
            //         Type: '',
            //         Country: {
            //             EnglishName: '',
            //             ID: ''
            //         },
            //         EnglishName: ''
            //     }
            // ],
            // localWeatherKeyJson: [
            //     {
            //         Key: ''
            //     }
            // ],
            // localCurrentWeather: [
            //     {
            //         EpochTime: '',
            //         ApparentTemperature: {
            //             Metric: {
            //                 Value: ''
            //             }
            //         },
            //         WeatherIcon: '',
            //         Temperature: {
            //             Metric: {
            //                 Value: ''
            //             }
            //         },
            //         RealFeelTemperature: {
            //             Metric: {
            //                 Value: ''
            //             }
            //         },
            //         WeatherText: ''
            //     }
            // ],
            // hourlyForecast: [
            //     {
            //         EpochDateTime: '',
            //         IconPhrase: '',
            //         Temperature: {
            //             Value: ''
            //         },
            //         WeatherIcon: ''
            //     }
            // ],
            // dailyForecast: {
            //     DailyForecasts: [
            //         {
            //             EpochDate: '',
            //             Temperature: {
            //                 Maximum: {
            //                     Value: ''
            //                 },
            //                 Minimum: {
            //                     Value: ''
            //                 }
            //             },
            //             Day: {
            //                 Icon: '',
            //                 IconPhrase: ''
            //             },
            //             Night: {
            //                 Icon: '',
            //                 IconPhrase: ''
            //             }
            //         }
            //     ]
            // }
        }
    }

    getLocation = () => {
        const google_api_key = 'AIzaSyDkv3JKsB__r75VpVNt5XP-HNzbBDC5anQ';
        if (navigator.geolocation) {
            let success = (position) => {
                    this.setState({
                        gotLocation: true
                    });
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${google_api_key}&language=en`,
                        {method: 'GET'}
                    )
                        .then(response => response.json())
                        .then(json => this.setState({
                            geoJson: json
                        }))
                        .then(() => {
                            const weather_api_key = 'w1gY3UgnKDweZNE4ZHwtAo3Go9RhUPIQ';
                            let cityName = this.state.geoJson.results[2].address_components[1].short_name;
                            fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09${weather_api_key}&q=${cityName}`,
                                {method: 'GET'}
                            )
                                .then(response => response.json())
                                .then(json => this.setState({localWeatherKeyJson: json}))
                                .then(() => {
                                    const weatherKey = this.state.localWeatherKeyJson[0].Key;
                                    fetch(`https://dataservice.accuweather.com/currentconditions/v1/${weatherKey}?apikey=${weather_api_key}&details=true`,
                                        {method: 'GET'}
                                    )
                                        .then(response => response.json())
                                        .then(json => this.setState({localCurrentWeather: json}));
                                    fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${weatherKey}?apikey=${weather_api_key}&language=en&metric=true`,
                                        {method: 'GET'}
                                    )
                                        .then(response => response.json())
                                        .then(json => this.setState({hourlyForecast: json}));
                                    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${weatherKey}?apikey=${weather_api_key}&metric=true`,
                                        {method: 'GET'}
                                    )
                                        .then(response => response.json())
                                        .then(json => this.setState({dailyForecast: json}));
                                })
                        })
                };

            let error = () => {
                this.setState({
                    gotLocation: false
                })
            };
            navigator.geolocation.getCurrentPosition(success, error);
        }
        else {
            this.setState({
                gotLocation: false
            })
        }
    };

    onSearch(e) {
        const weather_api_key = 'w1gY3UgnKDweZNE4ZHwtAo3Go9RhUPIQ';
        if (e.target.value !== '' && e.key === 'Enter') {
            let cityName = e.target.value;
            fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09${weather_api_key}&q=${cityName}`,
                {method: 'GET'}
            )
                .then(response => response.json())
                .then(json => {
                    if(!json.length) {
                        this.setState({gotResults: false})
                    } else {
                        this.setState({
                            searchJson: json,
                            gotResults: true,
                        });
                        const weather_api_key = 'w1gY3UgnKDweZNE4ZHwtAo3Go9RhUPIQ';
                        let searchKey = this.state.searchJson[0].Key;
                        fetch(`https://dataservice.accuweather.com/currentconditions/v1/${searchKey}?apikey=${weather_api_key}&details=true`,
                            {method: 'GET'}
                        )
                            .then(response => response.json())
                            .then(json => this.setState({localCurrentWeather: json}));
                        fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${searchKey}?apikey=${weather_api_key}&language=en&metric=true`,
                            {method: 'GET'}
                        )
                            .then(response => response.json())
                            .then(json => this.setState({hourlyForecast: json}));
                        fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${searchKey}?apikey=${weather_api_key}&metric=true`,
                            {method: 'GET'}
                        )
                            .then(response => response.json())
                            .then(json => this.setState({dailyForecast: json}));
                    }
                })
        }
    };

    componentDidMount() {
        // this.getLocation();
        this.setState({
            localCurrentWeather: current,
            hourlyForecast: hourly,
            dailyForecast: daily
        });
    }

    render() {
        const iconName = ['', sunny, sunny, mostlySunny, mostlySunny, mostlyCloudy, mostlyCloudy, cloudy, cloudy, '', '', fog, rain, chanceRain, chanceRain, tStorms, tStorms, tStorms, rain, flurries, flurries, flurries, snow, snow, unknown, sleet, sleet, '', '', sleet, unknown, unknown, unknown, clear, clear, mostlyCloudy, partlyCloudy, partlyCloudy, cloudy, rain, rain, tStorms, tStorms, flurries, snow];

        return (
            <Router>
                <div className="main-wrapper">
                    <div className="top-wrapper">
                        <Search
                            onSearch={this.onSearch.bind(this)}
                            searchJson={this.state.searchJson}
                            gotResults={this.state.gotResults}
                        />
                        <div className="details">
                            <Location
                                cityName={this.state.geoJson.results[2].address_components[1].short_name}
                                countryID={this.state.geoJson.results[2].address_components[3].short_name}
                                gotLocation={this.state.gotLocation}
                            />
                            <div className="time">
                                <LocalTime/>
                            </div>
                        </div>
                    </div>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/current-weather"/>}/>
                        <Route path="/current-weather"
                               render={() =>
                                   <CurrentWeather
                                       dailyForecast={this.state.dailyForecast.DailyForecasts}
                                       localCurrentWeather={this.state.localCurrentWeather}
                                       gotLocation={this.state.gotLocation}
                                       gotResults={this.state.gotResults}
                                       icon={iconName}
                                   />}/>
                        <Route path="/hourly-forecast"
                               render={() =>
                                   <HourlyForecast
                                       hourlyForecast={this.state.hourlyForecast}
                                       gotLocation={this.state.gotLocation}
                                       gotResults={this.state.gotResults}
                                       icon={iconName}
                                   />}/>
                        <Route path="/daily-forecast"
                               render={() =>
                                   <DailyForecast
                                       dailyForecast={this.state.dailyForecast.DailyForecasts}
                                       gotLocation={this.state.gotLocation}
                                       gotResults={this.state.gotResults}
                                       icon={iconName}
                                   />}/>
                        <Route
                            render={function () {
                                return <p>Not Found</p>;
                            }}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
