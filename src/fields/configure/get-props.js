import mapKeys from 'lodash/mapKeys';
import pickBy from 'lodash/pickBy';

export default (props, propsKey = 'mui') => mapKeys(pickBy(props, (v, k) => k.startsWith(propsKey + ':')), (v, k) => k.substring(propsKey.length + 1));
