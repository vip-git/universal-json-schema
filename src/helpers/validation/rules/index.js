/* eslint-disable global-require */
export default {
  maxLength: require('./max-length').default,
  minLength: require('./min-length').default,
  pattern: require('./pattern').default,
  minimum: require('./minimum').default,
  maximum: require('./maximum').default,
};
