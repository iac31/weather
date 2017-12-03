import React, { Component } from 'react';

class HourlyForecast extends Component {
    render() {
        let index = [1, 3, 5, 7, 9, 11];
        return (
            <div className="bottom-wrapper">
                <div className="wrapper">
                    {!this.props.gotLocation ? !this.props.gotResults ?
                        <div className="no-data">No Data</div> :
                        <div className="forecast">
                            {this.props.hourlyForecast.map((item, i) => (
                                index.indexOf(i) === -1 ? null :
                                    <div className="small-forecast" key={i}>
                                        <p>{new Date(item.EpochDateTime * 1000).getHours()}:{new Date(item.EpochDateTime * 1000).getMinutes() + '0'}</p>
                                        <img src={this.props.icon[item.WeatherIcon]} height='75px'
                                             alt='icon'/>
                                        <span>{item.IconPhrase}</span>
                                        <div className="min-max">
                                            <span>{Math.round(item.Temperature.Value)}<sup>&deg;</sup></span>
                                        </div>
                                    </div>
                            ))}
                        </div> :
                        <div className="forecast">
                            {this.props.hourlyForecast.map((item, i) => (
                                index.indexOf(i) === -1 ? null :
                                    <div className="small-forecast" key={i}>
                                        <p>{new Date(item.EpochDateTime * 1000).getHours()}:{new Date(item.EpochDateTime * 1000).getMinutes() + '0'}</p>
                                        <img src={this.props.icon[item.WeatherIcon]} height='75px'
                                             alt='icon'/>
                                        <span>{item.IconPhrase}</span>
                                        <div className="min-max">
                                            <span>{Math.round(item.Temperature.Value)}<sup>&deg;</sup></span>
                                        </div>
                                    </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default HourlyForecast;