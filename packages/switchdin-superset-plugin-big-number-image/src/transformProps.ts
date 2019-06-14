import * as color from 'd3-color';
import { getNumberFormatter, NumberFormats } from '@superset-ui/number-format';
import { renderTooltipFactory } from './BigNumberImage';

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const {
    colorPicker,
    metric,
    showTrendLine,
    startYAxisAtZero,
    subheader = '',
    imageFile,
    vizType,
    yAxisFormat,
  } = formData;
  const { data } = payload;

  let mainColor;
  if (colorPicker) {
    const { r, g, b } = colorPicker;
    mainColor = color.rgb(r, g, b).hex();
  }

  const metricName = metric && metric.label ? metric.label : metric;
  let bigNumber = data[0][metricName];
  let formattedSubheader = subheader;
  let className = '';
  const formatValue = getNumberFormatter(yAxisFormat);

  return {
    width,
    height,
    bigNumber,
    className,
    formatBigNumber: formatValue,
    mainColor,
    renderTooltip: renderTooltipFactory(formatValue),
    startYAxisAtZero,
    subheader: formattedSubheader,
    imageFile,
  };
}
