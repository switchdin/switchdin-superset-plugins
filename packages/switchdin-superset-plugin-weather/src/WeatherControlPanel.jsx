import { t } from '@superset-ui/translation';

export const citySelectionControl = {
  type: 'TextControl',
  label: t('City'),
  default: '',
};

export const countrySelectionControl = {
  type: 'TextControl',
  label: t('Country'),
  default: '',
  description: t('Country code, e.g. au for Australia'),
};

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
