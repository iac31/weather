import React, { Component } from 'react';
import mapPin from '../icons/placeholderfilled.svg';

class Location extends Component {
    render() {
        return (
            <div>
                <img src={mapPin} height='75px' alt="pin"/>
                <div className="location">
                    {this.props.gotLocation ?
                        <span>{this.props.cityName}, {this.props.countryID}</span> :
                        <span>Unable to get location</span>
                    }
                </div>
            </div>
        )
    }
}

export default Location;