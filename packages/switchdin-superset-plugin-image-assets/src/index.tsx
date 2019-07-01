import React from 'react';
import { t } from '@superset-ui/translation';
import { xml as d3Xml  } from 'd3-fetch';
import { svg as d3Svg  } from 'd3-fetch';

import SwitchDin from './images/switchdin-logo.svg';
import House from './images/aus-house-left.svg';
import CarTrips from './images/car-trip-tsv-bris-left.svg';
import CO2Trees from './images/co2-trees-left.svg';
import DollarCost from './images/dollar-cost-left.svg';
import DollarSave from './images/dollar-savings-left.svg';
import Savings from './images/savings-left.svg';
import YurikaCowboysLogo from './images/yurika-cowboys.svg';
import Yurika from './images/yurika-logo.svg';
import Cowboys from './images/cowboys-logo.svg';
import PiggyBank from './images/piggy-bank.svg';

import RichEquivalentHomePower from './images/001_EquivalentHomePower.svg';
import RichEquivalentHomeConsumption from './images/002_EquivalentHomeConsumption.svg';
import RichTripsToBrisbane from './images/003_TripsToBrisbane.svg';
import RichReductionInElectricityBill from './images/004_ReductionInElectricityBills.svg';
import RichCo2AsTrees from './images/005_CO2_ReductionAsTrees.svg';
import CowboysSolarAndCarpark from './images/006_CowboysSolarAndCarpark.svg';
import CowboysCarpark from './images/007_CowboysCarpark.svg';


//
// These maps / functions are used to build the controls
//
const imageRegistry = {
  SwitchDin: ['SwitchDin', SwitchDin],
  House: ['House', House],
  CarTrips: ['Car Trips', CarTrips],
  CO2Trees: ['Trees Planted', CO2Trees],
  DollarCost: ['Cost In Dollars', DollarCost],
  DollarSave: ['Savings In Dollars', DollarSave],
  Savings: ['Energy Savings', Savings],
  Yurika: ['Yurika', Yurika],
  Cowboys: ['Cowboys RLFC', Cowboys],
  YurikaCowboysLogo: ['Yurika / Cowboys Logo', YurikaCowboysLogo],
  PiggyBank: ['Piggy bank', PiggyBank],
  RichEquivalentHomePower: ['(Rich) Equiv Home Power', RichEquivalentHomePower],
  RichEquivalentHomeConsumption: ['(Rich) Equiv Home Energy', RichEquivalentHomeConsumption],
  RichTripsToBrisbane: ['(Rich) Trips To Brisbane', RichTripsToBrisbane],
  RichReductionInElectricityBill: ['(Rich) Bill Reduction', RichReductionInElectricityBill],
  RichCo2AsTrees : ['(Rich) Co2 Reduction As Trees', RichCo2AsTrees],
  CowboysSolarAndCarpark : ['(image) Cowboys Solar and Car Park', CowboysSolarAndCarpark],
  CowboysCarpark : ['(image) Cowboys Car Park', CowboysCarpark],
};

export function getImageSelectControl() {
  var outArray = [];
  for (const key in imageRegistry) {
    outArray.push([key, imageRegistry[key][0]]);
  }
  return outArray;
}

//
// This is a control definition to enable images to be selected in
// superset/assets/src/explore/controls.jsx
//
export const imageListControl = {
  label: t('Image'),
  description: t('Choose the an Image to display with your number'),
  type: 'SelectControl',
  clearable: false,
  default: 'SwitchDin',
  choices: getImageSelectControl(),
  renderTrigger: true,
};

export const imagePositionControl = {
  label: t('Image Position'),
  description: t('Choose the position of the image'),
  type: 'SelectControl',
  clearable: false,
  default: 'left',
  choices: [
    [null, 'None'],
    ['left', 'Left of Text'],
    ['right','Right of Text'],
  ],
  renderTrigger: true,
};

//
// This function is the loader that returns the resource.
// It's probably not the most optimal method to use with React, We should
// create a component and reder some state variable.  
//
export default class ImageAsset extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      svg: null, 
      svgName: '',
      svgRichProps: null
    }
  }

  reloadSvg() {
    const { name, height, width, data } = this.props;
    const assetPath = imageRegistry[name][1];

    if(assetPath.endsWith('.svg'))
    {
      fetch(assetPath).then(res => {
        return res.text();
      }).then(res => {
        var parsedSvg = (new DOMParser).parseFromString(res, "image/svg+xml");
        // resize the SVG canvas based upon the props of this widget.
        parsedSvg.getElementsByTagName('svg')[0].style.height = height;
        parsedSvg.getElementsByTagName('svg')[0].style.width = width;
        // Update Rich Props From Data
        for( var key in data ) {
          const elt = parsedSvg.querySelector('#' + key);
          if(elt != null){ elt.innerHTML = data[key]; }
        }
        // Pass back the SVG to be encoded into the document
        const svgString = (new XMLSerializer).serializeToString(parsedSvg);
        // this will re-tiggger the render
        this.setState({ svg: svgString, svgName: name, svgRichProps: data });
      });
    }
    else
    {
      // pass. Leave normal images to the <img> tag.
    }
  }

  componentDidMount() {
    // Initial Load
    this.reloadSvg();
  }

  componentDidUpdate() {
    // Reselection
    const { name, data } = this.props;
    if (name == this.state.svgName && this.state.svgRichProps == data) {
      return;
    } else {
      this.reloadSvg();
    }
  }

  render() {
    // Rendering SVGs inline in React is a paranoid process.  None of the existing libraries seem particularly good.
    // There's a fundamental trust issue between React and anything that's loaded from the server
    // and not statically linked in or declared. So we're setting innerHTML to avoid writing an SVG parser.
    const { name } = this.props;
    const assetPath = imageRegistry[name][1];

    if( this.state.svg === null )
    {
      return <img src={assetPath} {...this.props} />
    }
    else
    {
      return ( 
        <div {...this.props} dangerouslySetInnerHTML={{__html: this.state.svg}} />
      );
    }
  }

};
