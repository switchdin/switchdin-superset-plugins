import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { getNumberFormatter } from '@superset-ui/number-format';
import { CategoricalColorNamespace } from '@superset-ui/color';
import { arc as d3Arc } from 'd3-shape';
import { format as d3Format } from 'd3-format';
import './Gauge.css';

//
// Speedo Chart Control
//
// SVG Canvas Dimensions. This should be the onlt thing that's hard coded.
// We can work these out statically because the browser will scale the SVG within the viewport.
//
const canvasDim = {x: 300, y: 200};
const canvasWhiteSpace = {x: 20, y:20}

// Locus of Focus for the chart
const chartCentroid = { x: canvasDim.x / 2 , y: canvasDim.y - canvasWhiteSpace.y };

// Arc Placement
const arcOuterRadius = Math.min(canvasDim.x - canvasWhiteSpace.x, 
                                canvasDim.y - canvasWhiteSpace.y) * 0.8;

const arcRadius = {outer: arcOuterRadius, inner: arcOuterRadius * 0.6};

// Needle Placement
const needleBaseRadius = Math.min(canvasDim.x, canvasDim.y) * 0.03;
const needleLength = Math.min(canvasDim.x, canvasDim.y) * 0.8;

class GaugeVis extends React.PureComponent {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  //
  // Gauge Arc
  //
  generateArcSegment(color, index, colorarray) {
    // Generates an arc segment from the colormap.
    const arcCalc = d3Arc;
    const arcParams = { key: index,
                        innerRadius: arcRadius.outer,
                        outerRadius: arcRadius.inner,
                        startAngle:(index   /colorarray.length) * Math.PI,
                        endAngle: ((index+1)/colorarray.length) * Math.PI,
                      };

    const arcProps = { className: "arc",
                       fill: `${ colorarray[index] }`,
                       fillOpacity: 0.8,
                       "corner-radius": "5px",
                       "pad-angle": 1 * Math.PI,
                       stroke: `${ colorarray[index] }`,
                       strokeWidth: "1px",
                       strokeLinejoin: "round",
                       color: `${ colorarray[index] }`,
                       d: arcCalc()(arcParams),
                     };

    return ( <path key={index} {...arcProps} /> )
  }
  generateArc(colorScheme) {
    // Color Scheme
    const colorFn = CategoricalColorNamespace.getScale(colorScheme);
    const colors = colorFn.colors;
    const segments = colors.length;
    const arcGroupProps = {
      key: "arc",
      transform: `translate(${chartCentroid.x},${chartCentroid.y}) rotate(-90)`,
    };

    return(
      <g {...arcGroupProps} >
        {colorFn.colors.map(this.generateArcSegment)}
      </g>
    );

  };
  //
  // Indicator Needle
  //
  generateNeedle(percentVal) {
    // Create a closed path and circle to represent the needle
    // Translate and rotate into position.
    const p1 = { x: -needleBaseRadius, y: 0              };
    const p2 = { x: 0,                 y: -needleLength  };
    const p3 = { x: needleBaseRadius,  y: 0              };
    const d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} z`;
    const rotationDeg = 180.0 * percentVal - 90.0;

    const needleGroupProps = {
      className: 'needle-group',
      transform: `translate(${chartCentroid.x},${chartCentroid.y}) rotate(${rotationDeg})`,
    };

    const needleBaseProps = {
      className: 'needle-base',
      cx: 0,
      cy: 0,
      r: needleBaseRadius,
    };

    const needleProps = { 
      className: 'needle-needle',
      d: d,
    };

    return (
      <g {...needleGroupProps}>
        <path {...needleProps} />
        <circle {...needleBaseProps} />
      </g>
    );
  }

  //
  // Text
  //
  generateText(percentVal, currentVal, maxVal, numberFormat) {

    const pct = getNumberFormatter('.1%')(percentVal);

    const formatter = getNumberFormatter(numberFormat);
    const cur = formatter(currentVal);
    const max = formatter(maxVal);

    const textGroupProps = {
    };

    const textProps = {
      className: 'text-base',
    };

    const pctProps = { textAnchor: "middle", 
                       x: chartCentroid.x, 
                       y: chartCentroid.y - 0.5 * arcRadius.inner,
                       fontSize: 'x-large',
                       fontWeight: '600',
                     };

    return (<text {...textProps} {...pctProps}><tspan>{pct}</tspan></text>);
  }

  generateSubheader() {

    const {subheader} = this.props;

    const textGroupProps = {
    };

    const textProps = {
      className: 'text-subheader',
    };

    const pctProps = { textAnchor: "middle", 
                       x: chartCentroid.x, 
                       y: chartCentroid.y - 0.2 * arcRadius.inner,
                       fontSize: '10px',
                       fontWeight: '400',
                     };

    return (<text {...textProps} {...pctProps}><tspan>{subheader}</tspan></text>);
  }

  render() {
    // Props
    const {data, yAxisFormat, colorScheme, height, width} = this.props;

    // The control found by this reference.
    const control = this.myRef.current;
    // Current Value
    const percentVal = (data.currentVal / data.maxVal);

    // SVG Size
    const svgProps = { 
      height: height, 
      width: width, };

    // Format As Specified By The Front End
    const displayedValue = d3Format('.2f')(percentVal);
    // Front end specified color scheme
    // Render
    return( 
      <div ref={this.myRef} className="gauge">
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={svgProps}>
          { this.generateArc(colorScheme) }
          { this.generateNeedle(percentVal) }
          { this.generateText(percentVal, data.currentVal, data.maxVal, yAxisFormat) }
          { this.generateSubheader() }
        </svg>
      </div>
    );
  }

  animateTo(p) {
    this.needle.animateTo(p);
  }
}

export default GaugeVis;
