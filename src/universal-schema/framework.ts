/* eslint-disable global-require */
import { uiFramework } from '@framework/ui-framework';
import { UniversalSchemaFramework } from './types/universal-schema-framework.type';

const Framework: UniversalSchemaFramework = {
  library: {
    React: require('react'),
    // nanoId: require('nanoid').nanoid,
  },
  uiFramework,
  interceptors: {
    translateRatings: import('@react-jsonschema-form-interceptors/translate-ratings'),
    // translateCurrency: import('@react-jsonschema-form-interceptors/translate-currency'),
    translateRangeDate: import('@react-jsonschema-form-interceptors/translate-range-date'),
  },
  parsers: {
    enumUtils: import('@parsers/enum-utils/src'),
    parseValues: import('@parsers/parse-values/src'),
  },
};

export default Framework;
