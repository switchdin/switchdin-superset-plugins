import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { BRAND_COLOR } from '@superset-ui/color';
import { smartDateVerboseFormatter } from '@superset-ui/time-format';
import { computeMaxFontSize } from '@superset-ui/dimension';

import './BigNumberImage.css';


const PROPORTION = {
  HEADER: 0.4,
  SUBHEADER: 0.1,
  IMAGE: 1.,
};

export function renderTooltipFactory(formatValue) {
  return function renderTooltip({ datum }) { // eslint-disable-line
    const { x: rawDate, y: rawValue } = datum;
    const formattedDate = smartDateVerboseFormatter(rawDate);
    const value = formatValue(rawValue);

    return (
      <div style={{ padding: '4px 8px' }}>
        {formattedDate}
        <br />
        <strong>{value}</strong>
      </div>
    );
  };
}

function identity(x) {
  return x;
}

const propTypes = {
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  bigNumber: PropTypes.number.isRequired,
  formatBigNumber: PropTypes.func,
  subheader: PropTypes.string,
  imageFile: PropTypes.string,
  mainColor: PropTypes.string,
  renderTooltip: PropTypes.func,
};
const defaultProps = {
  className: '',
  formatBigNumber: identity,
  subheader: '',
  imageFile: '',
  mainColor: BRAND_COLOR,
  renderTooltip: renderTooltipFactory(identity),
};

class BigNumberImageVis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.gradientId = shortid.generate();
  }

  getClassName() {
    const { className } = this.props;
    const names = `big_number ${className}`;
    return `${names}`;
  }

  createTemporaryContainer() {
    const container = document.createElement('div');
    container.className = this.getClassName();
    container.style.position = 'absolute'; // so it won't disrupt page layout
    container.style.opacity = 0;           // and not visible
    return container;
  }

  renderHeader(maxHeight) {
    const { bigNumber, formatBigNumber, width } = this.props;
    const text = formatBigNumber(bigNumber);

    const container = this.createTemporaryContainer();
    document.body.appendChild(container);
    const fontSize = computeMaxFontSize({
      text,
      maxWidth: Math.floor(width),
      maxHeight,
      className: 'header_line',
      container,
    });
    document.body.removeChild(container);

    return (
      <div
        className="header_line"
        style={{
          fontSize,
          height: maxHeight,
        }}
      >
        <span>{text}</span>
      </div>
    );
  }

  renderSubheader(maxHeight) {
    const { subheader, width } = this.props;
    let fontSize = 0;
    if (subheader) {
      const container = this.createTemporaryContainer();
      document.body.appendChild(container);
      fontSize = computeMaxFontSize({
        text: subheader,
        maxWidth: Math.floor(width),
        maxHeight,
        className: 'subheader_line',
        container,
      });
      document.body.removeChild(container);
    }

    return (
      <div
        className="subheader_line"
        style={{
          fontSize,
          height: maxHeight,
        }}
      >
        {subheader}
      </div>
    );
  }

  renderImage(maxHeight){
    const { imageFile } = this.props;
    return (
        <img src={imageFile} alt="Not Found" style={{height: maxHeight}}/>
    );
  }

  render() {
    const { height } = this.props;
    const className = this.getClassName();
    return (
      <div className={className}>
        {this.renderImage(Math.ceil(PROPORTION.IMAGE * height))}
        <div
          className="text_container"
        >
          {this.renderHeader(Math.ceil(PROPORTION.HEADER * height))}
          {this.renderSubheader(Math.ceil(PROPORTION.SUBHEADER * height))}
        </div>
      </div>
    );
  }
}

BigNumberImageVis.propTypes = propTypes;
BigNumberImageVis.defaultProps = defaultProps;

export default BigNumberImageVis;
