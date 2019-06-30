import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import RichImage from './RichImage';

const metadata = new ChartMetadata({
  name: t('Rich Image'),
  description: '',
  thumbnail,
});

const RichImageControlPanel = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [['image_selection_control', 'metric'], 
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

class RichImagePlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./RichImage'),
    });
  }
}

export default {
  ChartPlugin: RichImagePlugin,
  ControlPanel: RichImageControlPanel,
};
