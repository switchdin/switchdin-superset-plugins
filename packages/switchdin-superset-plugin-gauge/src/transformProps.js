import * as color from 'd3-color';

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const {
    metric,
    vizType,
    yAxisFormat,
    gaugeReference,
  } = formData;
  const { data } = payload;
  const metricName = metric && metric.label ? metric.label : metric;

  var tempGauge = gaugeReference;
  if (Math.abs(tempGauge) < 0.001) {
    tempGauge = 0.001;
  }
  var temp = parseFloat(
    Math.abs(data[0][metricName] / tempGauge
  ).toFixed(2));
  if (temp > 1) {
    temp = 1
  }
  let bigNumber = temp;

  let className = '';

  return {
    width,
    height,
    bigNumber,
    className,
  };
}
