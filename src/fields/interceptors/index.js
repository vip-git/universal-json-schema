/* eslint-disable global-require */
export const INTERCEPTOR_CONFIG = {
  TRANSLATE_CURRENCY: {
    name: 'translate-currency',
    util: require('./translate-currency'),
  },

  TRANSLATE_RATINGS: {
    name: 'translate-ratings',
    util: require('./translate-ratings'),
  },
};

export default INTERCEPTOR_CONFIG;
