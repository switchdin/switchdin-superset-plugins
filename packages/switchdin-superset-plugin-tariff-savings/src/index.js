import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import TariffSavings from './TariffSavings';

const metadata = new ChartMetadata({
  name: t('Tariff Savings'),
  description: '',
  thumbnail,
});

const TariffSavingsControlPanel = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [['image_selection_control'], 
                       ['subheader'],
                       ['adhoc_filters']],
    },
    {
      label: t('Options'),
      expanded: true,
      controlSetRows: [['y_axis_format'],
                       ['color_scheme'], 
      ],
    },
  ],
  controlOverrides: {
    y_axis_format: {
      label: t('Number format'),
    },
  },
};

class TariffSavingsPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./TariffSavings'),
    });
  }
}

export default {
  ChartPlugin: TariffSavingsPlugin,
  ControlPanel: TariffSavingsControlPanel,
};
