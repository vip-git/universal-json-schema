// Helpers
import { has, get } from 'lodash';
import {
  hashCode,
} from '../../transform-schema';

const getHashCodeFromXHRDef = ({
  xhrSchema,
  eventName,
  fieldPath,
}: {
  xhrSchema: any;
  eventName: string;
  fieldPath?: string;
}) => {
  const xhrDataSourcePATH = fieldPath ? `${fieldPath}.${eventName}.xhr:datasource` : `${eventName}.xhr:datasource`;
  if (has(xhrSchema, xhrDataSourcePATH)) {
    const { url: eventUrl, method: eventMethod, payload } = get(xhrSchema, xhrDataSourcePATH);
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
