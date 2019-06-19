import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import GaugeChart from 'react-gauge-chart';
import { getNumberFormatter } from '@superset-ui/number-format';
import { format as d3Format } from 'd3-format';
import { CategoricalColorNamespace } from '@superset-ui/color';

class GaugeVis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.gradientId = shortid.generate();
    this.myRef = React.createRef();
  }

  render() {
    const { height, data, yAxisFormat, colorScheme } = this.props;
    const className = "gauge-container";
    const percentVal = (data.currentVal / data.maxVal);

    // Format As Specified By The Front End
    // - Note the widget we're using doesn't like superset numbering.
    //   Going with 2 decimal points at this stage (whole percents).
    const value = d3Format('.2f')(percentVal);

    // Use the specified color scheme
    const colorFn = CategoricalColorNamespace.getScale(colorScheme);

    // Delete the Old SVG In Place
    // Note: This is a bit of a dirty hack to dealw ith the library.
    if( this.myRef.current != null) {
      this.myRef.current.firstChild.innerHTML= '';
    }

    return (
      <div className={className} ref={this.myRef}>
        <GaugeChart
          id="my-gauge-chart"
          nrOfLevels={ colorFn.colors.length }
          colors={ colorFn.colors }
          percent={value}
          textColor={"#333333"}
          arcPadding={0.0}
          cornerRadius={0.0}
          arcWidth={0.5}
        />
      </div>
    );
  }
}

export default GaugeVis;
