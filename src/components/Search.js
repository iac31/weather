import React, { Component } from 'react';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            placeholder: 'Search',
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    onFocus() {
        this.setState({
            placeholder: ''
        })
    }

    onBlur() {
        this.setState({
            placeholder: 'Search'
        })
    }

    render() {
        return (
            <div className="input-wrapper">
                <input type="text" placeholder={this.state.placeholder}
                       onChange={this.handleChange.bind(this)}
                       onFocus={this.onFocus.bind(this)}
                       onBlur={this.onBlur.bind(this)}
                       onKeyPress={this.props.onSearch}/>
                {this.props.gotResults === false ?
                    <p>No results</p> :
                    <p>{this.props.searchJson[0].EnglishName} {this.props.searchJson[0].AdministrativeArea.ID} {this.props.searchJson[0].Country.EnglishName} {this.props.searchJson[0].Key}</p>
                }
            </div>
        );
    }
}

export default Search;