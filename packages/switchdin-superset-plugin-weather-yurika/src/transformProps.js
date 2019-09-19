import moment from 'moment';

export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;
  const { data } = queryData;

  let className = '';
  let city;
  let conditions;
  let country;
  let day_week;
  let date;
  let time;
  let sunrise_dt;
  let sunset_dt;
  let temp_now;
  let weather_id;
  let error;
  if (data.cod !== 404) {
    city = data.name;
    conditions = data.weather[0].description;
    country = data.sys.country;
    const now = moment().utcOffset(data.timezone / 60);
    day_week = now.format('dddd');
    date = now.format('D MMMM YYYY');
    time = now.format('h.mm a');
    sunrise_dt = moment
      .unix(data.sys.sunrise)
      .utcOffset(data.timezone / 60)
      .format('H.mm');
    sunset_dt = moment
      .unix(data.sys.sunset)
      .utcOffset(data.timezone / 60)
      .format('H.mm');
    temp_now = Math.round(data.main.temp * 10) / 10;
    weather_id = data.weather[0].id;
  } else {
    error = 'Location not found';
  }

  return {
    className,
    city,
    conditions,
    country,
    date,
    day_week,
    time,
    sunrise_dt,
    sunset_dt,
    temp_now,
    weather_id,
    error,
    width,
    height,
  };
}
