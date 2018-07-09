import includes from 'lodash/includes';

export default ({ htmlId, required, path }) => {
  const rv = {
    htmlFor: htmlId,
    required: includes(required, path),
  };
  return rv;
};
