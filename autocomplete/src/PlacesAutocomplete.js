import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class SimpleForm extends Component {
    constructor(props) {
        super(props);

        this.state = { address: 'San Fransisco, CA' };
        this.onChange = (address) => this.setState({ address });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(result => getLatLng(result[0]))
            .then(latLng => console.log('Success: ', latLng))
            .catch(error => console.log('Error: ', error))
    }

    // I tried to do this to see if the script came after the "./bundle.js" that autogenerates but it didn't

    // componentWillMount() {
    //     const script = document.createElement('scripts');

    //     script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC0bX2TBSK7gbp8qTUCfYF-d5TsYo0cq6w&libraries=places';
    //     script.async = true;

    //     document.body.appendChild(script);
    // }

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange
        };

        let options = {
            location: new google.maps.LatLng(59.334591, 18.063240),
            radius: 2000,
            types: ['address']
        };

        return (
            <form onSubmit={this.handleFormSubmit}>
                <PlacesAutocomplete
                    inputProps={inputProps}
                    options={this.options} />
                <button type="submit"> Submit </button>
            </form>
        );
    }
}