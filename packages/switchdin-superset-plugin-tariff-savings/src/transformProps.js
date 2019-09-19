export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;

  const {
    vizType,
    yAxisFormat,
    timeRange,
    colorScheme,
    subheader = '',
    imageSelectionControl,
  } = formData;

  const { data } = queryData;

  // This chart is only good for 1 number.
  let formattedSubheader = subheader;
  // var result = data;
  var result = formattedSubheader;

  return {
    width,
    height,
    colorScheme,
    timeRange,
    yAxisFormat,
    imageFile: imageSelectionControl,
    data: result,
  };
}
