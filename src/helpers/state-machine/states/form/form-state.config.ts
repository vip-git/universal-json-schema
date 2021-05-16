// Actions
type Actions = {
    DO_FORM_UPDATE: 'doFormUpdate';
    DISABLE_FORM_SUBMIT: 'disableSubmit';
    ENABLE_FORM_SUBMIT: 'enableFormSubmit';
    PROPOGATE_ONCHANGE_EVENT: 'callOnChange';
};

export type FormStateArrayEvents = {
  MOVE_ITEM_UP: 'moveItemUp';
  MOVE_ITEM_DOWN: 'moveItemDown';
  DELETE_ITEM: 'deleteItem';
  ADD_ITEM: 'addItem';
  ADD_NEW_PROPERTY: 'addNewProperty';
  UPDATE_NEW_PROPERTY: 'updateNewProperty',
  REMOVE_PROPERTY: 'removeProperty';
};

export type FormStateEvents = {
    UPDATE: 'update';
};

export type FormStateErrorEvents = {
  ERROR: 'error';
  INVALID: 'invalid';
};

type StateMachineConfig = {
    FORM_ACTIONS: Actions;
    FORM_STATE_EVENTS: FormStateEvents;
    FORM_STATE_ERROR_EVENTS: FormStateErrorEvents;
    FORM_STATE_ARRAY_EVENTS: FormStateArrayEvents;
}

/**
 * @description
 * Returns stringified path for a given event name.
 * 
 * @param path 
 * @param eventName 
 * @returns 
 */
export const pathToEventName = (
  path: string, 
  eventName?: string,
) => {
  const eventNameString = path.replace(/\[([0-9]+)\]/g, '');
  return (eventName 
    ? `${eventNameString}.update.${eventName}` 
    : `${eventNameString}.update`);
};

export const FORM_STATE_CONFIG: StateMachineConfig = {
  // List of rules to execute
  FORM_ACTIONS: {
    DO_FORM_UPDATE: 'doFormUpdate',
    DISABLE_FORM_SUBMIT: 'disableSubmit',
    ENABLE_FORM_SUBMIT: 'enableFormSubmit',
    PROPOGATE_ONCHANGE_EVENT: 'callOnChange',
  },
  FORM_STATE_ARRAY_EVENTS: {
    MOVE_ITEM_UP: 'moveItemUp',
    MOVE_ITEM_DOWN: 'moveItemDown',
    DELETE_ITEM: 'deleteItem',
    ADD_ITEM: 'addItem',
    ADD_NEW_PROPERTY: 'addNewProperty',
    REMOVE_PROPERTY: 'removeProperty',
    UPDATE_NEW_PROPERTY: 'updateNewProperty',
  },
  FORM_STATE_EVENTS: {
    UPDATE: 'update',
  },
  FORM_STATE_ERROR_EVENTS: {
    ERROR: 'error',
    INVALID: 'invalid',
  },
};

export default FORM_STATE_CONFIG;
