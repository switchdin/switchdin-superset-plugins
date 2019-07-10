import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import {default as WeatherControlPanel } from './YurikaWeatherControlPanel';

const metadata = new ChartMetadata({
  name: t('Yurika Weather'),
  description: 'Show the Weather Conditions At A Location',
  thumbnail,
});

class YurikaWeatherChartPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./YurikaWeather'),
    });
  }
}

// Exports
export default {
  ChartPlugin: YurikaWeatherChartPlugin,
  ControlPanel: WeatherControlPanel,
};

