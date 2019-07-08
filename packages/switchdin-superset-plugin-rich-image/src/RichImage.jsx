import React from 'react';
import { getNumberFormatter } from '@superset-ui/number-format';
import ImageAsset from '@switchdin-superset/switchdin-superset-image-assets';
import './RichImage.css';


class RichImageVis extends React.PureComponent {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    // Props
    const {data, yAxisFormat, colorScheme, height, width, imageFile} = this.props;
    // Format data / numerical result
    const formattedData = getNumberFormatter(yAxisFormat)(data);
    // Data to inline substitue in the SVG.
    const chart_data = { superset_metric: formattedData };

    return( 
      <div ref={this.myRef}>
      <ImageAsset name={imageFile} width='100%' height='100%' data={chart_data}/>
      </div>
    );
  }

}


export default RichImageVis;
