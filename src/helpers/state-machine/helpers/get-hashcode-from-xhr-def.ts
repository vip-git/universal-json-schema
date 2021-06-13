// Helpers
import { has } from 'lodash';
import {
  hashCode,
} from '../../transform-schema';

const getHashCodeFromXHRDef = ({
  xhrSchema,
  eventName,
  fieldPath,
}) => {
  if (has(xhrSchema, `${fieldPath}.${eventName}.xhr:datasource`)) {
    const { url: eventUrl, method: eventMethod, payload } = xhrSchema[fieldPath][eventName]['xhr:datasource'];
    const hashRef = hashCode(JSON.stringify({
      eventName,
      eventUrl,
      eventMethod,
      payload,
    }));
      
    return hashRef;
  }
  return false;
};

export default getHashCodeFromXHRDef;
