import * as color from 'd3-color';
import moment from 'moment';

export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;
  const { data } = queryData;

  let className = '';
  let city;
  let conditions;
  let country;
  let datetime;
  let humidity;
  let last_update;
  let sunrise_dt;
  let sunset_dt;
  let temp_max;
  let temp_min;
  let temp_now;
  let weather_id;
  let error;
  let translate_x;
  if (data.cod !== 404) {
    city = data.name;
    conditions = data.weather[0].description;
    country = data.sys.country;
    datetime = moment()
      .utcOffset(data.timezone / 60)
      .format('DD MMM h:mm a');
    const now = moment().utcOffset(data.timezone / 60);
    const mid = moment()
      .utcOffset(data.timezone / 60)
      .startOf('day');
    translate_x = 0.7 + ((now - mid) / 1000 / (3600 * 24)) * (247 - 0.7);
    humidity = data.main.humidity;
    last_update = moment
      .unix(data.dt)
      .utcOffset(data.timezone / 60)
      .format('YYYY-MM-DD h:mm a');
    sunrise_dt = moment
      .unix(data.sys.sunrise)
      .utcOffset(data.timezone / 60)
      .format('h:mm');
    sunset_dt = moment
      .unix(data.sys.sunset)
      .utcOffset(data.timezone / 60)
      .format('h:mm');
    temp_now = data.main.temp;
    temp_max = data.main.temp_max;
    temp_min = data.main.temp_min;
    weather_id = data.weather[0].id;
  } else {
    error = 'Location not found';
  }

  return {
    className,
    city,
    conditions,
    country,
    datetime,
    humidity,
    last_update,
    sunrise_dt,
    sunset_dt,
    temp_max,
    temp_min,
    temp_now,
    weather_id,
    error,
    width,
    height,
    translate_x,
  };
}
