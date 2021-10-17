/* eslint-disable global-require */
import { UniversalSchemaFramework } from './types/universal-schema-framework.type';
import { uiFramework } from '@framework/ui-framework';

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
    enumUtils: import('@react-jsonschema-form-utils/enum-utils'),
    parseValues: import('@react-jsonschema-form-utils/parse-values'),
  },
};

export default Framework;
