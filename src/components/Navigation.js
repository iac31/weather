import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import sun from '../icons/sun-navigation.svg';
import hourly from '../icons/24-hours-delivery.svg';
import daily from '../icons/calendar-weekly.svg'

class Navigation extends Component {


    render() {
        const NavItems = [
            {
                icon: sun,
                text: 'Current Weather',
                link: 'current-weather'
            },
            {
                icon: hourly,
                text: 'Hourly Forecast',
                link: 'hourly-forecast'
            },
            {
                icon: daily,
                text: 'Daily Forecast',
                link: 'daily-forecast'
            },
        ];

        return (
            <div className="navigation">
                {NavItems.map(item =>
                    <div className="nav-item" key={item.icon}>
                        <NavLink
                            to={`/${item.link.toLowerCase()}`}
                            activeStyle={{opacity: 1}}
                        >
                            <img src={item.icon} height='30px' alt='menu-icon'/>
                            <span>{item.text}</span>
                        </NavLink>
                    </div>
                )}
            </div>
        )
    }
}

export default Navigation;