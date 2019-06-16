import React from 'react';

//const path_house = require('./images/aus-house-left.svg') as string;
//const path_car_trip = require('./images/car-trip-tsv-bris-left.svg') as string;
//const path_cO2_trees = require('./images/co2-trees-left.svg') as string;
//const path_dollar_cost = require('./images/dollar-cost-left.svg') as string;
//const path_dollar_save = require('./images/dollar-savings-left.svg') as string;
//const path_save = require('./images/savings-left.svg') as string;
//const path_cowboys_logo = require('./images/yurika-cowboys.svg') as string;

import House from './images/aus-house-left.svg';
import CarTrips from './images/car-trip-tsv-bris-left.svg';

var images = { house: House, car_trip: CarTrips };

const ImageAsset = props => {
  switch (props.name) {
    case 'house':
      return <img src={House} {...props} />;
    case 'car_trip':
      return <img src={CarTrips} {...props} />;
    default:
      return <img src={House} {...props} />;
  }
};

export function getImageList() {
  return images;
}

export default ImageAsset;
