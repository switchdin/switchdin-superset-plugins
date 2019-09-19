export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;

  const { metric, vizType, yAxisFormat, timeRange, colorScheme, subheader = '' } = formData;

  const { data } = queryData;

  return {
    width,
    height,
    colorScheme,
    timeRange,
    yAxisFormat,
    data,
    subheader,
  };
}
