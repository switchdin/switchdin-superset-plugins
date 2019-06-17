import React from 'react';
import { t } from '@superset-ui/translation';

import SwitchDin from './images/switchdin-logo.svg';
import House from './images/aus-house-left.svg';
import CarTrips from './images/car-trip-tsv-bris-left.svg';
import CO2Trees from './images/co2-trees-left.svg';
import DollarCost from './images/dollar-cost-left.svg';
import DollarSave from './images/dollar-savings-left.svg';
import Savings from './images/savings-left.svg';
import YurikaCowboysLogo from './images/yurika-cowboys.svg';

//
// These maps / functions are used to build the controls
//
const imageRegistry = {
  SwitchDin: ['SwitchDin Logo', SwitchDin],
  House: ['A House', House],
  CarTrips: ['Car Trips', CarTrips],
  CO2Trees: ['Trees Planted', CO2Trees],
  DollarCost: ['Cost In Dollars', DollarCost],
  DollarSave: ['Savings In Dollars', DollarSave],
  Savings: ['Energy Savings', Savings],
  YurikaCowboysLogo: ['Yurika / Cowboys Logo', YurikaCowboysLogo],
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
  label: t('Icon Image'),
  description: t('Choose the an Image to display with your number'),
  type: 'SelectControl',
  clearable: false,
  default: 'SwitchDin',
  choices: getImageSelectControl(),
  renderTrigger: true,
};

//
// This function is the loader that returns the resource.
//
const ImageAsset = props => {
  var outObj = imageRegistry[props.name][1];
  return <img src={outObj} {...props} />;
};
export default ImageAsset;
