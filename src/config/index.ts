// Configs
import FIELDSET_CONFIG from './fieldset.config';

const CONFIG = {
  SCHEMA_TYPE: {
    ARRAY: 'array',
    OBJECT: 'object',
  },
  PAGE_LAYOUTS: {
    TABS: 'tabs',
    STEPS: 'steps',
    DEFAULT: 'default',
  },
  ...FIELDSET_CONFIG,
};

export default CONFIG;
