// Actions
type Actions = {
    DISABLE_FORM_SUBMIT: 'disableSubmit';
    ENABLE_FORM_SUBMIT: 'enableFormSubmit';
    PROPOGATE_ONCHANGE_EVENT: 'callOnChange';
};

type ValueOf<T> = T[keyof T];

export type FormStateArrayEvents = {
  MOVE_ITEM_UP: 'moveItemUp';
  MOVE_ITEM_DOWN: 'moveItemDown';
  DELETE_ITEM: 'deleteItem';
  ADD_ITEM: 'addItem';
  ADD_NEW_PROPERTY: 'addNewProperty';
  UPDATE_NEW_PROPERTY: 'updateNewProperty',
  REMOVE_PROPERTY: 'removeProperty';
};

export type FormStateXHREvents = {
  UPDATE_FORM_ON_XHR_COMPLETE: 'updateFormOnXHRComplete',
  UPDATE_XHR_PROGRESS: 'updateXHRProgress',
  ERROR_XHR_PROGRESS: 'errorXHRProgress'
};

export type FormStateEvents = {
    UPDATE: 'update';
};

export type FormStates = {
  INITIAL: 'clean',
  LOADING: 'loading',
  DIRTY: 'dirty',
  SUBMITTED: 'submitted',
  INVALID: 'invalid',
};

export type ValidStates = ValueOf<FormStates>;

export type FormStateErrorEvents = {
  ERROR: 'error';
  INVALID: 'invalid';
};

export type FormStateMachineConfig = {
    FORM_ACTIONS: Actions;
    FORM_STATES: FormStates;
    FORM_STATE_EVENTS: FormStateEvents;
    FORM_STATE_ERROR_EVENTS: FormStateErrorEvents;
    FORM_STATE_ARRAY_EVENTS: FormStateArrayEvents;
    FORM_STATE_XHR_EVENTS: FormStateXHREvents;
    FORM_STATE_SUBMIT_EVENT: 'submit';
};

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

export const FORM_STATE_CONFIG: FormStateMachineConfig = {
  FORM_STATES: {
    INITIAL: 'clean',
    LOADING: 'loading',
    DIRTY: 'dirty',
    SUBMITTED: 'submitted',
    INVALID: 'invalid',
  },
  
  // List of rules to execute
  FORM_ACTIONS: {
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
  FORM_STATE_XHR_EVENTS: {
    UPDATE_FORM_ON_XHR_COMPLETE: 'updateFormOnXHRComplete',
    UPDATE_XHR_PROGRESS: 'updateXHRProgress',
    ERROR_XHR_PROGRESS: 'errorXHRProgress',
  },
  FORM_STATE_EVENTS: {
    UPDATE: 'update',
  },
  FORM_STATE_ERROR_EVENTS: {
    ERROR: 'error',
    INVALID: 'invalid',
  },
  FORM_STATE_SUBMIT_EVENT: 'submit',
};
