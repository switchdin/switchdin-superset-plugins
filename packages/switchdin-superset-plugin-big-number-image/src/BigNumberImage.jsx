import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { BRAND_COLOR } from '@superset-ui/color';
import { smartDateVerboseFormatter } from '@superset-ui/time-format';
import { computeMaxFontSize } from '@superset-ui/dimension';
import ImageAsset from '@switchdin-superset/switchdin-superset-image-assets';

import './BigNumberImage.css';

const PROPORTION = {
  HEADER: 0.4,
  SUBHEADER: 0.1,
  IMAGE: 1,
};

export function renderTooltipFactory(formatValue) {
  return function renderTooltip({ datum }) {
    // eslint-disable-line
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
    container.style.opacity = 0; // and not visible
    return container;
  }

  calcTextAlign(imagePosition) {
    if( imagePosition == 'left') {
      return('right');
    } else {
      return('left');
    }
  }

  renderHeader(maxHeight, imagePosition) {
    const { bigNumber, formatBigNumber, width } = this.props;
    const text = formatBigNumber(bigNumber);

    const container = this.createTemporaryContainer();
    document.body.appendChild(container);
    const fontSize = computeMaxFontSize({
      text,
      maxWidth: 0.6 * Math.floor(width),
      maxHeight,
      className: 'header_line',
      container,
    });

    const fontStyles = {
      fontSize: fontSize,
      textAlign: this.calcTextAlign(imagePosition),
    }

    document.body.removeChild(container);
    return (
      <div className="header_line" style={fontStyles} >
        {text}
      </div>
    );
  }

  renderSubheader(maxHeight, imagePosition) {
    const { subheader, width } = this.props;
    let fontSize = 0;
    if (subheader) {
      const container = this.createTemporaryContainer();
      document.body.appendChild(container);
      fontSize = computeMaxFontSize({
        text: subheader,
        maxWidth: 0.6 * Math.floor(width),
        maxHeight,
        className: 'subheader_line',
        container,
      });
      document.body.removeChild(container);
    }

    const fontStyles = {
      fontSize: fontSize,
      textAlign: this.calcTextAlign(imagePosition),
    }

    return (
      <div className="subheader_line" style={fontStyles} >
        {subheader}
      </div>
    );
  }

  render() {
    const { height, width,  bigNumber, formatBigNumber, subheader, imageFile, imagePosition } = this.props;
    const className = this.getClassName();
    const text = formatBigNumber(bigNumber);
    const imageSquare = Math.min(width * 0.35, height);

    // Position the image on the left of the right of the text
    const left_of_text = imagePosition == 'left';
    const image_entry = <td><ImageAsset name={imageFile} padding='10px' width={imageSquare} height={imageSquare}/></td>;

    return (
      <div className={className}>
        <div className="text_container">
          <table>
            <tbody>
            <tr>
              {left_of_text && ( image_entry )}
              <td width="100%">
                <div>
                {this.renderHeader(Math.ceil(PROPORTION.HEADER * height), imagePosition)}
                <br />
                {this.renderSubheader(Math.ceil(PROPORTION.SUBHEADER * height), imagePosition)}
                </div>
              </td>
              {!left_of_text && ( image_entry )}
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BigNumberImageVis;
