// Library
import includes from 'lodash/includes';

// Types
import { GetLabelComponentProps } from '@core-types/configure/GetLabelComponentProps.type';

export default ({ htmlid, required, path }: GetLabelComponentProps) => {
  const rv = {
    htmlFor: htmlid,
    required: includes(required, path),
  };
  return rv;
};
