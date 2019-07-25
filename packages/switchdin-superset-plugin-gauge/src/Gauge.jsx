import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { getNumberFormatter } from '@superset-ui/number-format';
import { CategoricalColorNamespace } from '@superset-ui/color';
import { arc as d3Arc } from 'd3-shape';
import { format as d3Format } from 'd3-format';
import './Gauge.css';
import './ProximaSoftRegular.min.css';

//
// Speedo Chart Control
//
// SVG Canvas Dimensions. This should be the onlt thing that's hard coded.
// We can work these out statically because the browser will scale the SVG within the viewport.
//
const canvasDim = {x: 300, y: 200};
const canvasWhiteSpace = {x: 20, y: 20}

// Locus of Focus for the chart
const chartCentroid = { x: canvasDim.x / 2 , y: canvasDim.y / 2 + 2 * canvasWhiteSpace.y };
// const chartCentroid = { x: canvasDim.x / 2 , y: canvasDim.y / 2 };

// Arc Placement
const arcOuterRadius = Math.min(canvasDim.x - canvasWhiteSpace.x, 
                                canvasDim.y - canvasWhiteSpace.y) * 0.7;

const arcRadius = {outer: arcOuterRadius, inner: arcOuterRadius * 0.5};

// Needle Placement
const needleBaseRadius = Math.min(canvasDim.x, canvasDim.y) * 0.18;
const needleLength = Math.min(canvasDim.x, canvasDim.y) * 0.4;

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
                        padAngle: 0.05,
                        padRadius: 100,
                        cornerRadius: 5,
                        startAngle:(index   /colorarray.length) * Math.PI * (1 + 40 / 180),
                        endAngle: ((index+1)/colorarray.length) * Math.PI * (1 + 40 / 180),
                      };

    const arcProps = { className: "arc",
                       fill: `${ colorarray[index] }`,
                       stroke: 'white',
                       strokeWidth: "4px",
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
      transform: `translate(${chartCentroid.x},${chartCentroid.y}) rotate(-110)`,
    };

    return(
      <g {...arcGroupProps} >
        {colorFn.colors.map(this.generateArcSegment)}
      </g>
    );
  };
  // Indicator Needle
  //
  generateNeedle(percentVal) {
    // Create a closed path and circle to represent the needle
    // Translate and rotate into position.
    const p1 = { x: -needleBaseRadius, y: 0              };
    const p2 = { x: 0,                 y: -needleLength  };
    const p3 = { x: needleBaseRadius,  y: 0              };
    const d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} z`;
    const rotationDeg = 110.0 * (2.0 * percentVal - 1.0);
    // const rotationDeg = 110.0 * (2.0 * 1 - 1.0);

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

    function circleToPath(cx, cy, r) {
      return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
    };

    const needleBackProps = {
      className: 'needle-background',
      id: 'circletextpath',
      d: `${circleToPath(needleBaseProps.cx, needleBaseProps.cy, needleBaseProps.r * 1.5)}`,
    };

    const needleInnerCircProps = {
      className: 'needle-inner-circle',
      cx: needleBaseProps.cx,
      cy: needleBaseProps.cy,
      r: needleBaseProps.r * 0.8,
    };

    const needleProps = { 
      className: 'needle-needle',
      d: d,
    };

    return (
      <g {...needleGroupProps}>
        <path {...needleBackProps} />
        <path {...needleProps} />
        <circle {...needleBaseProps} />
        <circle {...needleInnerCircProps} />
      </g>
    );
  }

  //
  // Text
  //
  generateText(percentVal, currentVal, maxVal, numberFormat) {

    const pct = getNumberFormatter('.0%')(percentVal);

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
                       y: chartCentroid.x,
                       fontSize: 'x-large',
                       fontWeight: '600',
                       fill: 'white',
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

    const pctProps = { 
      transform: `translate(${chartCentroid.x},${chartCentroid.y}) rotate(5)`,
      dy: -5,
    };

    return (<text {...textProps} {...pctProps}><textPath xlinkHref='#circletextpath'>{subheader}</textPath></text>);
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
      height: '100%',
      width: '100%',
    };

    const rectangleProps = {
      height: '100%',
      width: '100%',
      fill: 'rgba(225,155,158, .34)',
    };

    // Front end specified color scheme
    // Render
    return( 
      <div ref={this.myRef} className="gauge" >
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={svgProps}>
          <rect style={rectangleProps} />
          { this.generateArc(colorScheme) }
          { this.generateNeedle(percentVal) }
          { this.generateText(percentVal, data.currentVal, data.maxVal, yAxisFormat) }
          { this.generateSubheader() }
        </svg>
      </div>
    );
  }

}

export default GaugeVis;
