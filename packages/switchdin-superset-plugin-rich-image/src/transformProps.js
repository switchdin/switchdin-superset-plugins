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
  const result = data[0][metric.label];

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
