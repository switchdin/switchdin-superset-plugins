export default function transformProps(chartProps) {
  const { width, 
          height, 
          formData, 
          payload } = chartProps;

  const { metric,
          vizType,
          yAxisFormat,
          timeRange,
          colorScheme,
          imageSelectionControl,
        } = formData;

  const { data 
        } = payload;

  // This chart is only good for 1 number.
  var metric_label = metric.label;
  if(metric_label === undefined) {
    metric_label = metric;
  }
  var result = data[0][metric_label];

  return {
    width,
    height,
    colorScheme,
    timeRange,
    yAxisFormat,
    imageFile: imageSelectionControl,
    data: result,
  }
}
