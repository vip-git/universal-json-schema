// Library
import compact from 'lodash/compact';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import values from 'lodash/values';
import isEmpty from 'lodash/isEmpty';

const isFormInValid = (validation) => !isEmpty(
  compact(
    uniq(
      map(values(validation), (v) => {
        if (typeof v === 'object') {
          return isFormInValid(v);
        }
        return isEmpty(v) ? null : v;
      }),
    ),
  ),
);

export default isFormInValid;
