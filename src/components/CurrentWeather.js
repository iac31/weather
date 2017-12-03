import React, { Component } from 'react';

class CurrentWeather extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
        }
    }

    render() {
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];

        return (
            <div className="bottom-wrapper">
                <div className="wrapper">
                    {!this.props.gotLocation ? !this.props.gotResults ?
                        <div className="no-data">No Data</div> :
                        <div className="content">
                            <div className="current">
                                <div>
                                    <div className="temp">
                                        <span
                                            className="temperature">{Math.round(this.props.localCurrentWeather[0].Temperature.Metric.Value)}</span><span
                                        className="deg">&deg;</span>
                                    </div>
                                    <div className="date">
                                        <span>{day[this.state.date.getDay()].toUpperCase()} {this.state.date.getDate()}<sup>th</sup></span>
                                    </div>
                                </div>
                            </div>
                            <div className="big-icon">
                                <img src={this.props.icon[this.props.localCurrentWeather[0].WeatherIcon]} height='175px'
                                     alt='icon'/>
                                <span>Real Feel: {Math.round(this.props.localCurrentWeather[0].RealFeelTemperature.Metric.Value)}<sup>&deg;</sup> / {this.props.localCurrentWeather[0].WeatherText}</span>
                            </div>
                            <div className="forecast">
                                <div className="small-forecast">
                                    <p>{'Today'.toUpperCase()}</p>
                                    <img src={this.props.icon[this.props.dailyForecast[0].Day.Icon]} height='75px'
                                         alt='icon'/>
                                    <span>{this.props.dailyForecast[0].Day.IconPhrase}</span>
                                    <div className="min-max">
                                        <span>{Math.round(this.props.dailyForecast[0].Temperature.Maximum.Value)}<sup>&deg;</sup></span>
                                    </div>
                                </div>
                                <div className="small-forecast">
                                    <p>{'Tonight'.toUpperCase()}</p>
                                    <img src={this.props.icon[this.props.dailyForecast[0].Night.Icon]} height='75px'
                                         alt='icon'/>
                                    <span>{this.props.dailyForecast[0].Night.IconPhrase}</span>
                                    <div className="min-max">
                                        <span>{Math.round(this.props.dailyForecast[0].Temperature.Minimum.Value)}<sup>&deg;</sup></span>
                                    </div>
                                </div>
                                {this.props.dailyForecast.map((item, i) => (
                                    i === 0 ? null :
                                        <div className="small-forecast" key={i}>
                                            <p>{day[new Date(item.EpochDate * 1000).getDay()].toUpperCase()}</p>
                                            <img src={this.props.icon[item.Day.Icon]} height='75px' alt='icon'/>
                                            <span>{item.Day.IconPhrase}</span>
                                            <div className="min-max">
                                                <span>{Math.round(item.Temperature.Maximum.Value)}<sup>&deg;</sup> / {Math.round(item.Temperature.Minimum.Value)}<sup>&deg;</sup></span>
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div> :
                        <div className="content">
                            <div className="current">
                                <div>
                                    <div className="temp">
                                        <span
                                            className="temperature">{Math.round(this.props.localCurrentWeather[0].Temperature.Metric.Value)}</span><span
                                        className="deg">&deg;</span>
                                    </div>
                                    <div className="date">
                                        <span>{day[this.state.date.getDay()].toUpperCase()} {this.state.date.getDate()}<sup>th</sup></span>
                                    </div>
                                </div>
                            </div>
                            <div className="big-icon">
                                <img src={this.props.icon[this.props.localCurrentWeather[0].WeatherIcon]} height='175px'
                                     alt='icon'/>
                                <span>Real Feel: {Math.round(this.props.localCurrentWeather[0].RealFeelTemperature.Metric.Value)}<sup>&deg;</sup> / {this.props.localCurrentWeather[0].WeatherText}</span>
                            </div>
                            <div className="forecast">
                                <div className="small-forecast">
                                    <p>{'Today'.toUpperCase()}</p>
                                    <img src={this.props.icon[this.props.dailyForecast[0].Day.Icon]} height='75px'
                                         alt='icon'/>
                                    <span>{this.props.dailyForecast[0].Day.IconPhrase}</span>
                                    <div className="min-max">
                                        <span>{Math.round(this.props.dailyForecast[0].Temperature.Maximum.Value)}<sup>&deg;</sup></span>
                                    </div>
                                </div>
                                <div className="small-forecast">
                                    <p>{'Tonight'.toUpperCase()}</p>
                                    <img src={this.props.icon[this.props.dailyForecast[0].Night.Icon]} height='75px'
                                         alt='icon'/>
                                    <span>{this.props.dailyForecast[0].Night.IconPhrase}</span>
                                    <div className="min-max">
                                        <span>{Math.round(this.props.dailyForecast[0].Temperature.Minimum.Value)}<sup>&deg;</sup></span>
                                    </div>
                                </div>
                                {this.props.dailyForecast.map((item, i) => (
                                    i === 0 ? null :
                                        <div className="small-forecast" key={i}>
                                            <p>{day[new Date(item.EpochDate * 1000).getDay()].toUpperCase()}</p>
                                            <img src={this.props.icon[item.Day.Icon]} height='75px' alt='icon'/>
                                            <span>{item.Day.IconPhrase}</span>
                                            <div className="min-max">
                                                <span>{Math.round(item.Temperature.Maximum.Value)}<sup>&deg;</sup> / {Math.round(item.Temperature.Minimum.Value)}<sup>&deg;</sup></span>
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default CurrentWeather;