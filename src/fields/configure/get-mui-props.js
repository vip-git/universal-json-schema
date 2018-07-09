import mapKeys from 'lodash/mapKeys';
import pickBy from 'lodash/pickBy';

export default props => mapKeys(pickBy(props, (v, k) => k.startsWith('mui:')), (v, k) => k.substring(4));
