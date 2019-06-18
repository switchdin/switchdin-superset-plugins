import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { smartDateVerboseFormatter } from '@superset-ui/time-format';
import GaugeChart from 'react-gauge-chart';

import './Gauge.css';


const propTypes = {
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  bigNumber: PropTypes.number.isRequired,
};
const defaultProps = {
  className: '',
};

class GaugeVis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.gradientId = shortid.generate();
  }

  renderGauge() {
    const { bigNumber } = this.props;
    return (
      <GaugeChart
        id="my-gauge-chart"
        nrOfLevels={6}
        colors={["#FF0000", "#00FF00"]}
        arcPadding={0.025}
        arcWidth={0.7}
        percent={bigNumber}
        textColor={"#333333"}
      />
    );
  }

  render() {
    const { height } = this.props;
    const className = "gauge-container";
    return (
      <div className={className}>
      {this.renderGauge()}
      </div>
    );
  }
}

GaugeVis.propTypes = propTypes;
GaugeVis.defaultProps = defaultProps;

export default GaugeVis;
