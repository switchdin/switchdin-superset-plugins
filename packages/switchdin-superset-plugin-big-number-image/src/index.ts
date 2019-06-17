import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import BigNumberImageControlPanel from './BigNumberImageControlPanel';

const metadata = new ChartMetadata({
  name: t('Big Number with Image'),
  description: '',
  thumbnail,
});

class BigNumberImageChartPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./BigNumberImage'),
    });
  }
}

export default {
  ChartPlugin: BigNumberImageChartPlugin,
  ControlPanel: BigNumberImageControlPanel,
};
