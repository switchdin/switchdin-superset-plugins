import { getNumberFormatter } from '@superset-ui/number-format';
import { renderTooltipFactory } from './BigNumberImage';

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;

  const { subheader = '', imageSelectionControl, imagePositionControl, timeRange, metric, yAxisFormat } = formData;

  const { data } = payload;

  const metricName = metric && metric.label ? metric.label : metric;
  let bigNumber = data[0][metricName];
  let formattedSubheader = subheader;
  const formatValue = getNumberFormatter(yAxisFormat);

  return {
    width,
    height,
    bigNumber,
    formatBigNumber: formatValue,
    renderTooltip: renderTooltipFactory(formatValue),
    subheader: formattedSubheader,
    imageFile: imageSelectionControl,
    imagePosition: imagePositionControl,
    timeRange,
  };
}
