import includes from 'lodash/includes';

export default ({ htmlid, required, path }) => {
  const rv = {
    htmlFor: htmlid,
    required: includes(required, path),
  };
  return rv;
};
