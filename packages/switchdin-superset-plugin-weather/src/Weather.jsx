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
  temp_max: PropTypes.number,
  temp_min: PropTypes.number,
  temp_now: PropTypes.number,
  weather_id: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  error: PropTypes.string,
  translate_x: PropTypes.number,
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
      { this.props.temp_now && this.props.conditions && <p style={{ fontSize: maxHeight}}>{this.props.temp_now} &deg;C {this.props.conditions}</p> }
      { this.props.humidity && <p style={{ fontSize: maxHeight}}>Humidity: {this.props.humidity}%</p> }
      { this.props.error && <p style={{ fontSize: maxHeight}}>{this.props.error}</p> }
      { this.props.last_update && <p style={{ fontSize: maxHeight}}>last update: { this.props.last_update}</p> }
      </div>
    );
  }

  renderBackground() {
    const sunrise = (this.props.sunrise_dt) ? this.props.sunrise_dt : "NA";
    const sunset = (this.props.sunset_dt) ? this.props.sunset_dt : "NA";
    const datetimenow = (this.props.datetime) ? this.props.datetime : "NA";
    const temp_now = (this.props.temp_now) ? this.props.temp_now : "NA";
    const temp_max = (this.props.temp_max) ? this.props.temp_max : "NA";
    const temp_min = (this.props.temp_min) ? this.props.temp_min : "NA";
    const move1 = "matrix(.98918 0 0 1.0232 45.046 12.364)";//" translate("+this.props.translate_x+")";
    const move2 = "matrix(.02186 0 0 .02345 14.085 12.451)";//" translate("+this.props.translate_x+")";
    const move3 = "matrix(.97847 0 0 1.0399 -7.684 -33.057)";//" translate("+this.props.translate_x+")";
    const move4 = "translate("+this.props.translate_x+")";
    return (
      // <svg width="100%" height="127.54mm" preserveAspectRatio="xMaxYMid meet" viewBox="0 0 325.44 127.54">
      //   <rect y="-7.9556e-7" width="325.44" height="127.54" fill="none" strokeWidth="2.3569"/>
      //   <path d="m28.477 101.19s-0.12662-77.7 134.24-77.701c134.37-7.33e-4 134.24 77.701 134.24 77.701" fill="none" opacity=".5" stroke="#ff9b00" strokeDasharray="15.14190105, 15.14190105" strokeWidth="1.2618"/>
      //   <text x="5.183794" y="118" fill="#5c646e" fontFamily="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif" fontSize="12.7px" letterSpacing="0px" strokeWidth=".26458" wordSpacing="0px" style={{lineHeight:1.25}} ><tspan x="5.183794" y="118" fontFamily="'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif'" strokeWidth=".26458">{sunrise} am</tspan></text>
      //   <text x="270.4664" y="118" fill="#5c646e" fontFamily="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif" fontSize="12.7px" letterSpacing="0px" strokeWidth=".26458" wordSpacing="0px" style={{lineHeight:1.25}} ><tspan x="270.4664" y="118" fontFamily="'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif'" strokeWidth=".26458">{sunset} pm</tspan></text>
      // </svg>
  <svg width={this.props.width} height="100%" viewBox="0 0 281.48 118.53" preserveAspectRatio="xMaxYMid meet">
    <defs>
      <linearGradient id="prefix__a">
        <stop stopColor="#727272" offset={0} />
        <stop stopColor="#727272" stopOpacity={0} offset={1} />
      </linearGradient>
      <linearGradient
        id="prefix__b"
        x1={-24.332}
        x2={30.327}
        y1={86.282}
        y2={86.282}
        gradientTransform="matrix(1.9267 0 0 1 67.687 -29.805)"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#prefix__a"
      />
      <linearGradient
        id="prefix__c"
        x1={-24.332}
        x2={30.327}
        y1={86.282}
        y2={86.282}
        gradientTransform="matrix(2.2231 0 0 1 -167.81 -59.696)"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#prefix__a"
      />
    </defs>
    <text
      transform="translate(45.672 12.62)"
      x={19.633}
      y={90.355}
      fontFamily="sans-serif"
      fontSize={10.583}
      fontWeight={700}
      letterSpacing={0}
      strokeWidth={0.265}
      wordSpacing={0}
      style={{
        fontFeatureSettings: 'normal',
        fontVariantCaps: 'normal',
        fontVariantLigatures: 'normal',
        fontVariantNumeric: 'normal',
        lineHeight: 1.25,
      }}
    >
      <tspan x={19.633} y={90.355}>
        Todays Weather: {this.props.conditions}
      </tspan>
    </text>
    <path d="M20.88 30.697h246.69v51.945H20.88z" fill="#00b0fc" />
    <path d="M20.808 30.508h105.31v51.947H20.808z" fill="url(#prefix__b)" />
    <path
      transform="matrix(-1 0 0 1 45.672 30.083)"
      d="M-221.9.614h121.51v51.945H-221.9z"
      fill="url(#prefix__c)"
    />
    <text
      transform="translate(25.672 12.62)"
      x={71.483}
      y={100.39}
      fontFamily="sans-serif"
      fontSize={5.644}
      fontWeight={400}
      letterSpacing={0}
      strokeWidth={0.265}
      wordSpacing={0}
      style={{
        fontFeatureSettings: 'normal',
        fontVariantCaps: 'normal',
        fontVariantLigatures: 'normal',
        fontVariantNumeric: 'normal',
        lineHeight: 1.25,
      }}
    >
      <tspan x={71.483} y={100.39}>
        Now {temp_now}&deg;C / Max {temp_max}&deg;C / Min {temp_min}&deg;C
      </tspan>
    </text>
    <path
      d="M65.799 83.07c11.78 0 23.56 0 36.38-12.945 12.82-12.946 26.679-38.837 41.672-38.818 14.993.02 31.12 25.949 44.664 38.926 13.545 12.977 24.506 13.002 35.467 13.027"
      fill="#f4e868"
      stroke="#000"
      strokeWidth={0.265}
    />
    <g transform={move4} >
    <path
      d="M20.774 26.486h255.87v57.657H20.774z"
      fill="#fff"
      />
    <path
      transform={move3}
      d="M29.085 112.44V57.255"
      fill="#fff"
      stroke="#333e46"
      strokeDasharray="0.66325232 0.66325232"
      strokeWidth={0.663}
    />
    <path
      transform={move2}
      d="M104.91 306c0-14.478-11.75-26.229-26.229-26.229H26.225C11.746 279.771-.004 291.522-.004 306c0 14.479 11.75 26.229 26.229 26.229h52.457c14.478 0 26.228-11.75 26.228-26.229zm26.229 148.63c-7.239 0-13.796 2.938-18.553 7.676l-34.971 34.972c-4.739 4.756-7.676 11.313-7.676 18.552 0 14.479 11.733 26.229 26.229 26.229a26.087 26.087 0 0 0 18.535-7.693l34.972-34.972a26.08 26.08 0 0 0 7.694-18.534c-.001-14.48-11.734-26.23-26.23-26.23zm174.86-349.72c14.496 0 26.229-11.75 26.229-26.229V26.225c0-14.479-11.733-26.229-26.229-26.229s-26.229 11.75-26.229 26.229v52.457c0 14.478 11.733 26.228 26.229 26.228zm174.86 52.458a26.139 26.139 0 0 0 18.534-7.676l34.972-34.972c4.756-4.756 7.693-11.313 7.693-18.552 0-14.478-11.732-26.229-26.229-26.229-7.238 0-13.796 2.938-18.552 7.694l-34.972 34.971a26.143 26.143 0 0 0-7.676 18.535c.002 14.478 11.734 26.229 26.23 26.229zm-368.27-7.677c4.756 4.738 11.313 7.676 18.553 7.676 14.478 0 26.229-11.75 26.229-26.229 0-7.239-2.938-13.796-7.676-18.552l-34.972-34.971c-4.756-4.739-11.313-7.676-18.552-7.676-14.478 0-26.229 11.75-26.229 26.229a26.143 26.143 0 0 0 7.676 18.535zm473.18 130.08h-52.457c-14.479 0-26.229 11.75-26.229 26.229s11.75 26.229 26.229 26.229h52.457c14.479 0 26.229-11.75 26.229-26.229 0-14.478-11.75-26.229-26.229-26.229zm-86.362 182.53c-4.756-4.738-11.312-7.676-18.552-7.676-14.479 0-26.229 11.75-26.229 26.229a26.139 26.139 0 0 0 7.676 18.534l34.972 34.972c4.756 4.756 11.313 7.693 18.552 7.693 14.479 0 26.229-11.75 26.229-26.229 0-7.238-2.938-13.796-7.676-18.552zm-193.41 44.781c-14.496 0-26.229 11.75-26.229 26.229v52.457c0 14.478 11.733 26.228 26.229 26.228s26.229-11.75 26.229-26.229V533.31c0-14.478-11.733-26.228-26.229-26.228zm0-384.69c-101.24 0-183.6 82.358-183.6 183.6s82.358 183.6 183.6 183.6 183.6-82.358 183.6-183.6-82.358-183.6-183.6-183.6zm0 314.74c-72.321 0-131.14-58.821-131.14-131.14 0-72.321 58.822-131.14 131.14-131.14s131.14 58.822 131.14 131.14-58.822 131.14-131.14 131.14z"
      fill="#e88e03"
      stroke="#e88e03"
    />
      <text
        transform="matrix(.98918 0 0 1.0232 45.046 12.364)"
        x={-40.772}
        y={-1.5}
        fontFamily="sans-serif"
        fontSize={6.979}
        fontWeight={400}
        letterSpacing={0}
        strokeWidth={0.262}
        wordSpacing={0}
        style={{
          fontFeatureSettings: 'normal',
          fontVariantCaps: 'normal',
          fontVariantLigatures: 'normal',
          fontVariantNumeric: 'normal',
          lineHeight: 1.25,
        }}
      >
        <tspan x={-40.772} y={-1.5}>
          {datetimenow}
        </tspan>
      </text>
    </g>
    <text
      transform="translate(45.672 12.62)"
      x={19.031}
      y={77.557}
      fontFamily="sans-serif"
      fontSize={4.233}
      fontWeight={400}
      letterSpacing={0}
      strokeWidth={0.265}
      wordSpacing={0}
      style={{
        fontFeatureSettings: 'normal',
        fontVariantCaps: 'normal',
        fontVariantLigatures: 'normal',
        fontVariantNumeric: 'normal',
        lineHeight: 1.25,
      }}
    >
      <tspan
        x={19.031}
        y={77.557}
        style={{
          fontFeatureSettings: 'normal',
          fontVariantCaps: 'normal',
          fontVariantLigatures: 'normal',
          fontVariantNumeric: 'normal',
        }}
      >
        {sunrise} am
      </tspan>
    </text>
    <text
      transform="translate(45.672 12.62)"
      x={158.172}
      y={78.617}
      fontFamily="sans-serif"
      fontSize={4.233}
      fontWeight={400}
      letterSpacing={0}
      strokeWidth={0.265}
      wordSpacing={0}
      style={{
        fontFeatureSettings: 'normal',
        fontVariantCaps: 'normal',
        fontVariantLigatures: 'normal',
        fontVariantNumeric: 'normal',
        lineHeight: 1.25,
      }}
    >
      <tspan
        x={158.172}
        y={78.617}
        style={{
          fontFeatureSettings: 'normal',
          fontVariantCaps: 'normal',
          fontVariantLigatures: 'normal',
          fontVariantNumeric: 'normal',
        }}
      >
        {sunset} pm
      </tspan>
    </text>
    <path
      d="M65.264 82.626c11.78 0 23.56 0 36.38-12.946 12.82-12.945 26.68-38.837 41.672-38.818 14.994.02 31.12 25.949 44.665 38.926 13.544 12.978 24.505 13.002 35.466 13.027h44.46m-247.1-.189h44.46"
      fill="none"
      stroke="#000"
    />
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
      {/*{ this.renderWeather(Math.ceil(PROPORTION.TEXT * height), Math.ceil(PROPORTION.ICON * height)) }*/}
      </div>
    );
  }
}

WeatherVis.propTypes = propTypes;
WeatherVis.defaultProps = defaultProps;

export default WeatherVis;
