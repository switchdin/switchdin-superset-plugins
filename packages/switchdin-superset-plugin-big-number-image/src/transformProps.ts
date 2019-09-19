import { getNumberFormatter } from '@superset-ui/number-format';
import { renderTooltipFactory } from './BigNumberImage';

export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;

  const {
    subheader = '',
    imageSelectionControl,
    imagePositionControl,
    timeRange,
    metric,
    yAxisFormat,
    colorScheme,
  } = formData;

  const { data } = queryData;

  const metricName = metric && metric.label ? metric.label : metric;
  let bigNumber = data[0][metricName];
  let formattedSubheader = subheader;
  const formatValue = getNumberFormatter(yAxisFormat);

  return {
    width,
    height,
    bigNumber,
    formatBigNumber: formatValue,
    colorScheme,
    renderTooltip: renderTooltipFactory(formatValue),
    subheader: formattedSubheader,
    imageFile: imageSelectionControl,
    imagePosition: imagePositionControl,
    timeRange,
  };
}
