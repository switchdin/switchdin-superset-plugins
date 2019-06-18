import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import {default as WeatherControlPanel, citySelectionControl, countrySelectionControl } from './WeatherControlPanel';

const metadata = new ChartMetadata({
  name: t('Weather'),
  description: 'Show the Weather Conditions At A Location',
  thumbnail,
});

class WeatherChartPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./Weather'),
    });
  }
}

// Exports
export {countrySelectionControl, citySelectionControl};

export default {
  ChartPlugin: WeatherChartPlugin,
  ControlPanel: WeatherControlPanel,
};

