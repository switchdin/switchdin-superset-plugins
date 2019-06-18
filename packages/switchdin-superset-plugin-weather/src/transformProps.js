import * as color from 'd3-color';
import moment from 'moment';

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { data } = payload;

  let className = '';
  let city;
  let conditions;
  let country;
  let datetime;
  let hour;
  let hour_sunrise;
  let hour_sunset;
  let humidity;
  let last_update;
  let sunrise_dt;
  let sunset_dt;
  let temperature;
  let weather_id;
  let error;
  if (data.cod !== 404) {
    city = data.name;
    conditions = data.weather[0].description;
    country = data.sys.country;
    datetime = moment().utcOffset(data.timezone / 60).format('DD MMM h:mm a');
    hour = moment().utcOffset(data.timezone / 60).get('hour');
    hour_sunrise = moment.unix(data.sys.sunrise).utcOffset(data.timezone / 60).get('hour');
    hour_sunset = moment.unix(data.sys.sunset).utcOffset(data.timezone / 60).get('hour');
    humidity = data.main.humidity;
    last_update = moment.unix(data.dt).utcOffset(data.timezone / 60).format('YYYY-MM-DD h:mm a');
    sunrise_dt = moment.unix(data.sys.sunrise).utcOffset(data.timezone / 60).format('h:mm');
    sunset_dt = moment.unix(data.sys.sunset).utcOffset(data.timezone / 60).format('h:mm');
    temperature = data.main.temp;
    weather_id = data.weather[0].id;
  } else {
    error = "Location not found";
  }

  return {
    className,
    city,
    conditions,
    country,
    datetime,
    hour,
    hour_sunrise,
    hour_sunset,
    humidity,
    last_update,
    sunrise_dt,
    sunset_dt,
    temperature,
    weather_id,
    error,
    width,
    height,
  };
}
