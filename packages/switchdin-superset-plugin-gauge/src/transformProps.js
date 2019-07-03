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
          subheader = '',
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
    subheader,
  }
}
