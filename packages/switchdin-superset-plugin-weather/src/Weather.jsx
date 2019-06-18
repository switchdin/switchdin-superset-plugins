import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import './Weather.css';
import './weather-icons.min.css';


const propTypes = {
  city: PropTypes.string,
  className: PropTypes.string,
  conditions: PropTypes.string,
  country: PropTypes.string,
  datetime: PropTypes.string,
  humidity: PropTypes.number,
  last_update: PropTypes.string,
  sunrise_dt: PropTypes.string,
  sunset_dt: PropTypes.string,
  temperature: PropTypes.number,
  weather_id: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  error: PropTypes.string,
};
const defaultProps = {
  className: '',
};
const PROPORTION = {
  ICON: 0.15,
  TEXT: 0.05,
};

class WeatherVis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.gradientId = shortid.generate();
  }

  renderWeather(maxHeight, iconHeight) {
    return (
      <div className="weather-status">
      { this.props.weather_id && this.renderWeatherIcon(iconHeight) }
      { this.props.city && this.props.country && <p style={{ fontSize: maxHeight}}>{this.props.city}, {this.props.country} Weather</p> }
      { this.props.datetime && <p style={{ fontSize: maxHeight}}>{this.props.datetime}</p> }
      { this.props.temperature && this.props.conditions && <p style={{ fontSize: maxHeight}}>{this.props.temperature} &deg;C {this.props.conditions}</p> }
      { this.props.humidity && <p style={{ fontSize: maxHeight}}>Humidity: {this.props.humidity}%</p> }
      { this.props.error && <p style={{ fontSize: maxHeight}}>{this.props.error}</p> }
      { this.props.last_update && <p style={{ fontSize: maxHeight}}>last update: { this.props.last_update}</p> }
      </div>
    );
  }

  renderBackground() {
    const sunrise = (this.props.sunrise_dt) ? this.props.sunrise_dt : "NA";
    const sunset = (this.props.sunset_dt) ? this.props.sunset_dt : "NA";
    return (
      <svg width="100%" height="127.54mm" preserveAspectRatio="xMaxYMid meet" viewBox="0 0 325.44 127.54">
        <rect y="-7.9556e-7" width="325.44" height="127.54" fill="none" strokeWidth="2.3569"/>
        <path d="m28.477 101.19s-0.12662-77.7 134.24-77.701c134.37-7.33e-4 134.24 77.701 134.24 77.701" fill="none" opacity=".5" stroke="#ff9b00" strokeDasharray="15.14190105, 15.14190105" strokeWidth="1.2618"/>
        <text x="5.183794" y="118" fill="#5c646e" fontFamily="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif" fontSize="12.7px" letterSpacing="0px" strokeWidth=".26458" wordSpacing="0px" style={{lineHeight:1.25}} ><tspan x="5.183794" y="118" fontFamily="'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif'" strokeWidth=".26458">{sunrise} am</tspan></text>
        <text x="270.4664" y="118" fill="#5c646e" fontFamily="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif" fontSize="12.7px" letterSpacing="0px" strokeWidth=".26458" wordSpacing="0px" style={{lineHeight:1.25}} ><tspan x="270.4664" y="118" fontFamily="'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif'" strokeWidth=".26458">{sunset} pm</tspan></text>
      </svg>
    );
  }

  renderWeatherIcon(maxHeight) {
    const iconclass = "weatherIcon weathericon wi wi-owm-" + this.props.weather_id;
    return (
      <p style={{ fontSize: maxHeight }}><i className={ iconclass }></i></p>
    );
  }

  render() {
    const { height } = this.props;
    const className = "weather-container";
    return (
      <div className={className}>
      { this.renderBackground() }
      {/*{ this.props.weather_id && this.renderWeatherIcon(Math.ceil(PROPORTION.ICON * height)) }*/}
      { this.renderWeather(Math.ceil(PROPORTION.TEXT * height), Math.ceil(PROPORTION.ICON * height)) }
      </div>
    );
  }
}

WeatherVis.propTypes = propTypes;
WeatherVis.defaultProps = defaultProps;

export default WeatherVis;
