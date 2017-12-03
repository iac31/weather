import React, { Component } from 'react';

class DailyForecast extends Component {
    render() {
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
        return (
            <div className="bottom-wrapper">
                <div className="wrapper">
                    {!this.props.gotLocation ? !this.props.gotResults ?
                        <div className="no-data">No Data</div> :
                        <div className="forecast">
                            {this.props.dailyForecast.map(item => (
                                <div className="small-forecast" key={item.EpochDate}>
                                    <p>{day[new Date(item.EpochDate * 1000).getDay()].toUpperCase()}</p>
                                    <img src={this.props.icon[item.Day.Icon]} height='75px' alt='icon'/>
                                    <span>{item.Day.IconPhrase}</span>
                                    <div className="min-max">
                                        <span>{Math.round(item.Temperature.Maximum.Value)}<sup>&deg;</sup> / {Math.round(item.Temperature.Minimum.Value)}<sup>&deg;</sup></span>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <div className="forecast">
                            {this.props.dailyForecast.map(item => (
                                <div className="small-forecast" key={item.EpochDate}>
                                    <p>{day[new Date(item.EpochDate * 1000).getDay()].toUpperCase()}</p>
                                    <img src={this.props.icon[item.Day.Icon]} height='75px' alt='icon'/>
                                    <span>{item.Day.IconPhrase}</span>
                                    <div className="min-max">
                                        <span>{Math.round(item.Temperature.Maximum.Value)}<sup>&deg;</sup> / {Math.round(item.Temperature.Minimum.Value)}<sup>&deg;</sup></span>
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

export default DailyForecast;