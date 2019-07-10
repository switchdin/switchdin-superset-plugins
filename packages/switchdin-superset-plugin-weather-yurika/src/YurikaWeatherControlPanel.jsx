import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: t('Location'),
      expanded: true,
      controlSetRows: [
        ['city_selection'],
        ['country_selection'],
      ],
    },
  ],
  controlOverrides: {
  },
};
