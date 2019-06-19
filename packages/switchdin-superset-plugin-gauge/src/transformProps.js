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
        } = formData;

  const { data 
        } = payload;

  return {
    width,
    height,
    colorScheme,
    timeRange,
    yAxisFormat,
    data,
  }
}
