import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [['metric'], ['adhoc_filters']],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [['image_selection_control'], ['image_position_control'], ['subheader'], ['y_axis_format']],
    },
  ],
  controlOverrides: {
    y_axis_format: {
      label: t('Number format'),
    },
  },
};
