import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import './YurikaWeather.css';
import './weather-icons.min.css';
import './ProximaSoftRegular.min.css';


const propTypes = {
  city: PropTypes.string,
  className: PropTypes.string,
  conditions: PropTypes.string,
  country: PropTypes.string,
  date: PropTypes.string,
  day_week: PropTypes.string,
  time: PropTypes.string,
  sunrise_dt: PropTypes.string,
  sunset_dt: PropTypes.string,
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

  renderBackground() {
    const sunrise = (this.props.sunrise_dt) ? this.props.sunrise_dt : "NA";
    const sunset = (this.props.sunset_dt) ? this.props.sunset_dt : "NA";
    const datenow = (this.props.date) ? this.props.date : "NA";
    const timenow = (this.props.time) ? this.props.time : "NA";
    const daynow = (this.props.day_week) ? this.props.day_week : "NA";
    const temp_now = (this.props.temp_now) ? this.props.temp_now : "NA";
    const iconclass = "weatherIcon weathericon wi wi-owm-" + this.props.weather_id;
    // search all CSS to find the icon code by loading all the tags and selecting the right one
    var styleBySelector = {};
    for (var j=0; j<document.styleSheets.length; j++) {
      var styleList = document.styleSheets[j].rules || document.styleSheets[j].cssRules;
      for (var i=0; i<styleList.length; i++) {
        styleBySelector[styleList[i].selectorText] = styleList[i].style;
      }
    }
    var id = ".wi-owm-" + this.props.weather_id + "::before";
    const icon_code = styleBySelector[id].content;
    const svgProps = { 
      height: '100%', 
      width: this.props.width,
    };
    return (
  <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 764.89 420.55" style={svgProps}>
    <defs>
      <symbol id="prefix__w" overflow="visible">
        <path d="M1.453-7.453c0 4.656 3.172 7.828 7.578 7.828 2.063 0 3.813-.625 5.297-1.766.25-.187.406-.453.406-.765 0-.531-.437-.922-.968-.922-.172 0-.36.031-.516.125a6.436 6.436 0 0 1-4 1.406c-3.203 0-5.188-2.328-5.375-5.14h10.703c.86 0 1.36-.438 1.36-1.172 0-3.875-2.657-7.391-7.157-7.391-4.25 0-7.328 3.484-7.328 7.797zm7.297-5.89c3.39 0 4.875 2.75 4.875 4.968h-9.75C4-10.656 5.578-13.344 8.75-13.344z" />
      </symbol>
      <symbol id="prefix__x" overflow="visible">
        <path d="M9.922-15.25c-2.281 0-4.281 1.328-5.297 2.563v-1.172c0-.625-.531-1.141-1.172-1.141-.625 0-1.14.516-1.14 1.14v12.845c0 .609.515 1.14 1.171 1.14.61 0 1.141-.531 1.141-1.14v-9.86c.86-1.203 2.578-2.312 4.406-2.312 2 0 3.328.828 3.328 3.453v8.719c0 .609.516 1.14 1.14 1.14.642 0 1.173-.531 1.173-1.14v-9.438c0-3.234-1.64-4.797-4.75-4.797z" />
      </symbol>
      <symbol id="prefix__A" overflow="visible">
        <path d="M8.172-15.25c-2.125 0-3.86.61-5.375 1.938-.203.156-.39.468-.39.765a.96.96 0 0 0 .952.969c.25 0 .47-.094.61-.188 1.172-1.047 2.406-1.484 3.89-1.484 2.157 0 3.75 1.14 3.75 3.14v2.688c-1.187-1.39-2.89-2.031-4.922-2.031-2.53 0-5.203 1.562-5.203 4.89 0 3.235 2.672 4.938 5.203 4.938 2.032 0 3.766-.719 4.922-2.063v.672c0 .61.532 1.141 1.141 1.141.656 0 1.172-.531 1.172-1.14v-9.22c0-3.593-2.61-5.015-5.75-5.015zM7.516-1.297c-2.157 0-3.657-1.36-3.657-3.234 0-1.907 1.5-3.266 3.657-3.266 1.64 0 3.203.625 4.093 1.844v2.812c-.89 1.235-2.453 1.844-4.093 1.844z" />
      </symbol>
      <symbol id="prefix__t" overflow="visible">
        <path d="M12.047.375c3.078 0 5.297-1.14 7.063-3 .203-.203.296-.516.296-.828 0-.672-.546-1.203-1.203-1.203-.39 0-.703.156-.922.406-1.265 1.453-3.14 2.344-5.234 2.344-4.406 0-7.828-3.485-7.828-8.36 0-4.89 3.422-8.343 7.828-8.343 2.094 0 3.938.922 5.234 2.343.22.25.532.391.922.391.657 0 1.203-.547 1.203-1.187 0-.313-.093-.625-.296-.844-1.704-1.813-4.016-2.985-7.063-2.985-5.828 0-10.469 4.313-10.469 10.625C1.578-3.937 6.218.375 12.047.375z" />
      </symbol>
      <symbol id="prefix__u" overflow="visible">
        <path d="M13.5-15c-.625 0-1.14.516-1.14 1.14v9.922c-.86 1.188-2.594 2.25-4.407 2.25-2 0-3.328-.78-3.328-3.39v-8.781a1.157 1.157 0 0 0-2.312 0v9.484c0 3.234 1.625 4.75 4.75 4.75 2.25 0 4.156-1.172 5.297-2.437v1.046c0 .61.515 1.141 1.171 1.141.61 0 1.141-.531 1.141-1.14V-13.86c0-.625-.531-1.14-1.172-1.14z" />
      </symbol>
      <symbol id="prefix__v" overflow="visible">
        <path d="M8.688-15.125c-.25 0-.438.063-.735.156-1.203.297-2.437 1.281-3.328 2.485v-1.375c0-.625-.531-1.14-1.172-1.14-.625 0-1.14.515-1.14 1.14v12.844c0 .609.515 1.14 1.171 1.14.61 0 1.141-.531 1.141-1.14v-9.516c.672-1.203 2.5-2.25 3.844-2.344.812-.093 1.265-.593 1.265-1.14 0-.594-.375-1.11-1.046-1.11z" />
      </symbol>
      <symbol id="prefix__y" overflow="visible">
        <path d="M7.766-1.969c-.313 0-.532.281-1.172.281-1.016 0-1.516-.812-1.516-1.921v-9.235h2.125c.563 0 1.047-.469 1.047-1.015 0-.563-.484-1.016-1.047-1.016H5.078v-3.063c0-.609-.516-1.14-1.14-1.14-.641 0-1.172.531-1.172 1.14v3.063H1.203c-.562 0-1.016.453-1.016 1.016 0 .546.454 1.015 1.016 1.015h1.563v9.735C2.766-.891 3.875.375 6.062.375 7 .375 7.641.187 8.142-.094c.39-.187.609-.453.609-.89 0-.594-.406-.985-.984-.985z" />
      </symbol>
      <symbol id="prefix__z" overflow="visible">
        <path d="M16.328.125c.688 0 1.297-.438 1.484-1.078l4-12.516a1.57 1.57 0 0 0 .063-.39c0-.626-.516-1.141-1.14-1.141-.516 0-.985.328-1.11.797L16.203-3.015 12.578-14.11c-.188-.563-.688-.891-1.266-.891-.593 0-1.078.328-1.265.89L6.407-3.014 2.983-14.203c-.125-.47-.578-.797-1.11-.797-.608 0-1.14.484-1.14 1.14 0 .11.032.235.063.36L4.812-.953c.172.64.797 1.078 1.47 1.078.687 0 1.265-.438 1.452-1.078l3.578-11 3.563 11A1.51 1.51 0 0 0 16.328.125z" />
      </symbol>
      <symbol id="prefix__B" overflow="visible">
        <path d="M13.531.125c.64 0 1.172-.531 1.172-1.14V-10.5c0-3.25-1.64-4.75-4.75-4.75-2.25 0-4.281 1.297-5.328 2.531v-6.812a1.157 1.157 0 0 0-2.313 0v18.516c0 .61.516 1.14 1.172 1.14.61 0 1.14-.531 1.14-1.14v-9.86c.891-1.203 2.61-2.312 4.407-2.312 2 0 3.36.765 3.36 3.39v8.782c0 .609.515 1.14 1.14 1.14z" />
      </symbol>
      <symbol id="prefix__k" overflow="visible">
        <path d="M2.813-2.281C5.296-.531 8.483.5 12.546.5 20 .5 23.609-3.313 23.609-8.375c0-6.125-5.797-7.484-10.36-8.531-3.187-.735-5.5-1.313-5.5-3.188 0-1.656 1.407-2.812 4.47-2.812 1.953 0 4.14.578 6.25 1.781.375.25.875.406 1.406.406 1.453 0 2.703-1.234 2.703-2.719 0-1-.578-1.906-1.375-2.328-2.64-1.53-5.422-2.28-8.563-2.28-6.921 0-10.906 3.734-10.906 8.327 0 6.172 5.797 7.422 10.312 8.453 3.204.75 5.594 1.453 5.594 3.516 0 1.578-1.562 3.11-4.797 3.11-2.78 0-5.062-.876-6.968-2.188-.454-.344-.985-.5-1.563-.5-1.5 0-2.734 1.234-2.734 2.765 0 .954.5 1.782 1.234 2.282z" />
      </symbol>
      <symbol id="prefix__l" overflow="visible">
        <path d="M18.719-20.297c-1.453 0-2.61 1.203-2.61 2.656v11.172c-.906 1.172-2.515 2.281-4.546 2.281-2.25 0-3.688-.906-3.688-3.687v-9.766c0-1.453-1.203-2.656-2.61-2.656A2.644 2.644 0 0 0 2.61-17.64v11.844C2.61-1.907 4.688.5 9.078.5c3.266 0 5.625-1.5 7-2.984v.125A2.677 2.677 0 0 0 18.766.328c1.453 0 2.61-1.203 2.61-2.687V-17.64a2.674 2.674 0 0 0-2.657-2.656z" />
      </symbol>
      <symbol id="prefix__m" overflow="visible">
        <path d="M14.875-20.5c-3.281 0-5.672 1.563-6.969 3.016v-.157a2.69 2.69 0 0 0-2.687-2.703c-1.453 0-2.61 1.203-2.61 2.703V-2.36A2.644 2.644 0 0 0 5.266.297c1.406 0 2.609-1.204 2.609-2.657v-11.109c.86-1.187 2.484-2.36 4.547-2.36 2.234 0 3.687.954 3.687 3.735v9.735c0 1.453 1.203 2.656 2.61 2.656 1.5 0 2.656-1.203 2.656-2.656v-11.766c0-3.89-2.11-6.375-6.5-6.375z" />
      </symbol>
      <symbol id="prefix__n" overflow="visible">
        <path d="M12.469-20.375c-.453 0-.828.125-1.328.328-1.203.453-2.406 1.578-3.266 2.781l.032-.375c0-1.5-1.204-2.656-2.688-2.656-1.453 0-2.61 1.203-2.61 2.688v15.25A2.644 2.644 0 0 0 5.267.297c1.406 0 2.61-1.203 2.61-2.656v-10.86c.859-1.28 2.937-2.03 4.296-2.187 1.656-.25 2.485-1.328 2.485-2.61s-.782-2.359-2.188-2.359z" />
      </symbol>
      <symbol id="prefix__o" overflow="visible">
        <path d="M5.219-23.281c1.734 0 3.156-1.406 3.156-3.14a3.157 3.157 0 0 0-3.156-3.157c-1.703 0-3.14 1.406-3.14 3.156 0 1.735 1.437 3.141 3.14 3.141zm0 23.578a2.674 2.674 0 0 0 2.656-2.656V-17.64c0-1.453-1.203-2.656-2.61-2.656A2.644 2.644 0 0 0 2.61-17.64v15.28C2.61-.905 3.766.298 5.22.298z" />
      </symbol>
      <symbol id="prefix__p" overflow="visible">
        <path d="M2.438-1.453C4.562-.172 7.125.5 9.811.5c5.563 0 8.657-2.781 8.657-6.422 0-4.969-4.594-5.89-8.032-6.547-2.234-.453-3.812-.906-3.812-2.156 0-1.156 1.25-1.86 3.156-1.86 1.688 0 3.266.5 4.547 1.282.25.172.672.25 1 .25 1.11 0 2.031-.906 2.031-2.031 0-.75-.422-1.407-1.047-1.735C14.5-19.844 12.297-20.5 9.734-20.5c-5.265 0-8.203 2.938-8.203 6.297 0 4.766 4.438 5.594 7.875 6.25 2.281.453 4.016.953 4.016 2.36 0 1.25-1.078 2.03-3.36 2.03-1.812 0-3.812-.703-5.422-1.703-.328-.156-.703-.28-1.125-.28A2.194 2.194 0 0 0 1.328-3.36c0 .797.453 1.53 1.11 1.906z" />
      </symbol>
      <symbol id="prefix__q" overflow="visible">
        <path d="M1.328-10.031C1.328-3.609 5.922.5 12.016.5c2.313 0 4.64-.547 6.578-1.656.672-.375 1.125-1.047 1.125-1.828 0-1.11-.953-2.063-2.078-2.063-.375 0-.703.078-.984.235-1.25.718-2.735 1.125-4.063 1.125-3.39 0-5.422-2.11-5.765-4.641h11.766c2 0 3.109-.75 3.109-2.484 0-5.22-4.062-9.688-10.016-9.688-6.094 0-10.359 4.672-10.359 10.47zm10.36-6.281c3.468 0 4.796 2.515 4.921 4.422h-9.86c.25-1.985 1.657-4.422 4.938-4.422z" />
      </symbol>
      <symbol id="prefix__r" overflow="visible">
        <path d="M1.953-16.938c0 1.813 1.531 3.344 3.344 3.344 1.828 0 3.36-1.531 3.36-3.344 0-1.828-1.532-3.36-3.36-3.36-1.813 0-3.344 1.532-3.344 3.36zm0 14.031c0 1.828 1.531 3.36 3.344 3.36 1.828 0 3.36-1.532 3.36-3.36 0-1.812-1.532-3.344-3.36-3.344-1.813 0-3.344 1.531-3.344 3.344z" />
      </symbol>
      <symbol id="prefix__s" overflow="visible">
        <path d="M11.594-4.266c-.25 0-.5.079-.86.079-1.171 0-1.78-.954-1.78-2.188v-9.031h2.062a2.294 2.294 0 0 0 2.281-2.281c0-1.282-1.031-2.313-2.281-2.313H8.953v-3.11c0-1.452-1.203-2.655-2.609-2.655-1.5 0-2.703 1.203-2.703 2.656V-20H2.36a2.307 2.307 0 0 0-2.313 2.312c0 1.25 1.031 2.28 2.313 2.28h1.28v10.439C3.64-1.406 5.64.5 9.314.5c1.125 0 2.031-.172 2.734-.422.922-.282 1.578-1.031 1.578-2.063 0-1.25-.78-2.203-2.03-2.281z" />
      </symbol>
      <filter id="prefix__a" x={0} y={0} width={1} height={1}>
        <feColorMatrix
          in="SourceGraphic"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
      </filter>
      <mask id="prefix__c">
        <g filter="url(#prefix__a)">
          <path fillOpacity={0.34} d="M0 0h1920v1080H0z" />
        </g>
      </mask>
      <clipPath id="prefix__b">
        <path d="M0 0h1082v489H0z" />
      </clipPath>
      <g id="prefix__d" clipPath="url(#prefix__b)">
        <path d="M1 487.28h1079.7V1.85H1z" fill="#f03d51" />
      </g>
    </defs>
    <use
      transform="matrix(.70844 0 0 .86634 -.708 -1.604)"
      width="100%"
      height="100%"
      mask="url(#prefix__c)"
      xlinkHref="#prefix__d"
    />
    <g fill="#5c238f" transform="translate(-571.99 -63.169)">
      <use
        x={156.581}
        y={378.478}
        width="100%"
        height="100%"
        xlinkHref="#prefix__e"
      />
      <use
        x={329.484}
        y={378.478}
        width="100%"
        height="100%"
        xlinkHref="#prefix__e"
      />
      <use
        x={200.541}
        y={521.649}
        width="100%"
        height="100%"
        xlinkHref="#prefix__f"
      />
    </g>
    <g fill="#fff">
      <g transform="translate(-571.99 -63.169)">
        <use
          x={1384.687}
          y={624.487}
          width="100%"
          height="100%"
          xlinkHref="#prefix__g"
        />
        <use
          x={1500.597}
          y={624.487}
          width="100%"
          height="100%"
          xlinkHref="#prefix__g"
        />
        <use
          x={1543.581}
          y={624.487}
          width="100%"
          height="100%"
          xlinkHref="#prefix__g"
        />
        <use
          x={754.711}
          y={166.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__h"
        />
        <use
          x={799.565}
          y={166.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__i"
        />
        <use
          x={873.037}
          y={166.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__i"
        />
        <use
          x={748.954}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__j"
        />
        <use
          x={759.643}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__j"
        />
        <use
          x={770.331}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__j"
        />
        <use
          x={736.111}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__j"
        />
        <use
          x={748.954}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__j"
        />
        <use
          x={759.643}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__j"
        />
        <use
          x={1158.912}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__h"
        />
      </g>
      <g transform="translate(-571.99 -63.169)">
        <use
          x={596}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__k"
        />
        <use
          x={620.857}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__l"
        />
        <use
          x={644.844}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__m"
        />
        <use
          x={668.831}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__n"
        />
        <use
          x={683.746}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__o"
        />
        <use
          x={694.227}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__p"
        />
        <use
          x={713.988}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__q"
        />
        <use
          x={736.898}
          y={412.999}
          width="100%"
          height="100%"
          xlinkHref="#prefix__r"
        />
      </g>
      <g transform="translate(-571.99 -63.169)">
        <use
          x={596}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__k"
        />
        <use
          x={620.857}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__l"
        />
        <use
          x={644.844}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__m"
        />
        <use
          x={668.831}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__p"
        />
        <use
          x={688.593}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__q"
        />
        <use
          x={711.503}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__s"
        />
        <use
          x={725.505}
          y={462.92}
          width="100%"
          height="100%"
          xlinkHref="#prefix__r"
        />
      </g>
      <g transform="translate(-571.99 -63.169)">
        <use
          x={1057.592}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__t"
        />
        <use
          x={1078.232}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__u"
        />
        <use
          x={1095.206}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__v"
        />
        <use
          x={1105.372}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__v"
        />
        <use
          x={1115.537}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__w"
        />
        <use
          x={1132.881}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__x"
        />
        <use
          x={1149.855}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__y"
        />
        <use
          x={1166.86}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__z"
        />
        <use
          x={1189.471}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__w"
        />
        <use
          x={1206.815}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__A"
        />
        <use
          x={1223.05}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__y"
        />
        <use
          x={1232.107}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__B"
        />
        <use
          x={1249.111}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__w"
        />
        <use
          x={1266.455}
          y={360.336}
          width="100%"
          height="100%"
          xlinkHref="#prefix__v"
        />
      </g>
      <g transform="translate(-571.99 -63.169)">
        <use
          x={1459.542}
          y={1001.062}
          width="100%"
          height="100%"
          xlinkHref="#prefix__g"
        />
        <use
          x={1635.412}
          y={1001.062}
          width="100%"
          height="100%"
          xlinkHref="#prefix__g"
        />
        <use
          x={771.526}
          y={848.452}
          width="100%"
          height="100%"
          xlinkHref="#prefix__C"
        />
        <use
          x={781.258}
          y={914.255}
          width="100%"
          height="100%"
          xlinkHref="#prefix__D"
        />
        <use
          x={872.78}
          y={970.384}
          width="100%"
          height="100%"
          xlinkHref="#prefix__E"
        />
        <use
          x={959.042}
          y={921.526}
          width="100%"
          height="100%"
          xlinkHref="#prefix__F"
        />
      </g>
      <g
        fontFamily="proxima_softregular"
        letterSpacing={0}
        strokeWidth={0.75}
        wordSpacing={0}
      >
        <text
          x={477.013}
          y={388.928}
          fontSize={80}
          fontWeight="bold"
          style={{
            lineHeight: 1.25,
          }}
        >
          <tspan x={477.013} y={388.928}>
            <tspan x={477.013} y={388.928}>
              {temp_now}&deg;C
            </tspan>
          </tspan>
        </text>
        <text
          x={208.88}
          y={349.763}
          fontSize={40}
          style={{
            lineHeight: 1.25,
          }}
        >
          <tspan x={208.88} y={349.763}>
            {sunrise}
          </tspan>
        </text>
        <text
          x={208.88}
          y={399.685}
          fontSize={40}
          style={{
            lineHeight: 1.25,
          }}
        >
          <tspan x={208.88} y={399.685}>
            {sunset}
          </tspan>
        </text>
        <text
          x={29.168}
          y={212.517}
          fontSize={72}
          style={{
            lineHeight: 1.25,
          }}
        >
          <tspan x={29.168} y={212.517} fontWeight="bold">
            {timenow}
          </tspan>
        </text>
        <text
          x={189.285}
          y={102.674}
          fontSize={26}
          style={{
            lineHeight: 1.25,
          }}
        >
          <tspan x={189.285} y={102.674} fontWeight="bold">
            {datenow}
          </tspan>
        </text>
        <text
          x={30.236}
          y={102.328}
          fontSize={26}
          style={{
            lineHeight: 1.25,
          }}
        >
          <tspan x={30.236} y={102.328}>
            {daynow}
          </tspan>
        </text>
        {/*<image>
        <i style={{fontSize: 0.3 * this.props.height}} className={ iconclass }></i>
        </image>*/}
        {/*<g><text x={50} y={50} fontFamily={"weathericons"} >&#xf04a;</text></g>*/}
        <g>
          <text 
            style={{fontSize: 180}}
            x={500} y={190}
            fontFamily={"weathericons"}
          >
          {icon_code.substring(1, icon_code.length-1)}
          </text>
        </g>
      </g>
    </g>
  </svg>
    );
  }

  renderWeatherIcon(maxHeight) {
    const iconclass = "weatherIcon weathericon wi wi-owm-" + this.props.weather_id;
    const styleIcon = {
      fontSize: maxHeight,
    };
    return (
      // <p style={styleIcon}><i className={ iconclass }></i></p>
      <i style={styleIcon} className={ iconclass }></i>
    );
  }

  render() {
    const { height } = this.props;
    const className = "weather-container";
    return (
      <div className={className}>
      {/*{ this.props.weather_id && this.renderWeatherIcon(Math.ceil(0.3 * height)) }*/}
      { this.renderBackground() }
      </div>
    );
  }
}

WeatherVis.propTypes = propTypes;
WeatherVis.defaultProps = defaultProps;

export default WeatherVis;
