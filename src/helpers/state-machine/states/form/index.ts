// Library
import { get, each, map } from 'lodash';

// Mutations
import formMutations from './form-state.mutations';

// Config
import { FORM_STATE_CONFIG } from './form-state.config';

// GUARDS
import GUARDS from './form-state.guards';

const addFormFieldStatesBasedOnPath = (getPath) => {
  const arrayTypeStates = {};
  Object.values(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS,
  ).forEach((arrayVal) => {
    arrayTypeStates[arrayVal] = { 
      target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
      actions: ['updateArrayData'],
    };
  });
  
  const genericTypeStates = {
    [FORM_STATE_CONFIG.FORM_STATE_EVENTS.UPDATE]: { 
      target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
      cond: GUARDS.isUpdatedField(getPath),
      actions: ['updateData'],
    },
    [FORM_STATE_CONFIG.FORM_STATE_ERROR_EVENTS.ERROR]: { 
      target: FORM_STATE_CONFIG.FORM_STATES.INVALID,
      cond: GUARDS.isUpdatedErrorField(getPath),
    },
  };
  
  const sharedStates = {
    ...arrayTypeStates,
    ...genericTypeStates,
  };

  const submitState = {
    [FORM_STATE_CONFIG.FORM_STATE_SUBMIT_EVENT]: { target: FORM_STATE_CONFIG.FORM_STATES.SUBMITTED },
  };
  
  const stateDefinition = {
    initial: FORM_STATE_CONFIG.FORM_STATES.INITIAL,
    states: {
      [FORM_STATE_CONFIG.FORM_STATES.INITIAL]: {
        on: {
          ...sharedStates,
          ...submitState,
        },
      },
      [FORM_STATE_CONFIG.FORM_STATES.INVALID]: {
        on: {
          ...sharedStates,
        },
      },
      [FORM_STATE_CONFIG.FORM_STATES.DIRTY]: {
        on: {
          ...sharedStates,
          ...submitState,
        },
      },
      disabled: {
        type: 'final',
      },
      [FORM_STATE_CONFIG.FORM_STATES.SUBMITTED]: {
        type: 'final',
      },
    },
  };
  
  return stateDefinition;
};

export const createParallelFormFieldStates = ({
  type,
  schema,
  path,
  states,
  isArray,
}: {
  type?: 'object' | 'array';
  schema: { properties?: any; items?: any; };
  path?: string;
  states: Map<string, Object>;
  isArray?: boolean;
}) => {
  const formSchema = JSON.parse(JSON.stringify(schema));
  const getArrayPath = Array.isArray(formSchema.items) ? 'items' : 'items.properties';
  let iterator = get(formSchema, type === 'array' ? getArrayPath : 'properties');

  // Todo: Add tests for case to support items
  if (type === 'array' && !Array.isArray(formSchema.items)) {
    iterator = formSchema.default || [formSchema.items];
  }

  // Todo: Add tests for case to support additionalItems
  if (type === 'array' && formSchema.additionalItems) {
    iterator.push({ ...formSchema.additionalItems });
  }

  // Todo: Add tests for case to support additionalProperties
  if (
    formSchema.type === 'object' 
    && formSchema.additionalProperties 
    && formSchema.additionalProperties.properties
  ) {
    iterator = {
      ...iterator,
      ...formSchema.additionalProperties.properties,
    };
  }
  
  each(iterator, (givenValue, key) => {
    const stringifiedPath = isArray ? `${path}[${key}]` : `${path}.${key}`;
    const getPath = path ? stringifiedPath : key;

    states.set(getPath, addFormFieldStatesBasedOnPath(getPath));

    if (get(givenValue, 'type') === 'object' || get(givenValue, 'type') === 'array') {
      return createParallelFormFieldStates({
        type: get(givenValue, 'type'),
        schema: givenValue,
        path: getPath,
        isArray: get(givenValue, 'type') === 'array',
        states,
      });
    }
    
    states.set(getPath, addFormFieldStatesBasedOnPath(getPath));
    return states;
  });

  return states;
};

const createFormFieldStates = ({
  schema,
}) => {
  const states = {};
  const initialStates = createParallelFormFieldStates({
    schema: schema.type === 'object' ? schema : {
      type: 'object',
      properties: {
        'default': { ...schema },
      },
    },
    states: new Map(),
  });

  // Normalize Object
  initialStates.forEach((state, stateKey) => {
    states[stateKey] = state;
  });

  return {
    id: 'formMachine',
    initial: 'clean',
    type: 'parallel',
    states,
  };
};

export { formMutations };

export default createFormFieldStates;
