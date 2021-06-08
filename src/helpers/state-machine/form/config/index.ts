// Import
import { StepperStateMachineConfig, STEPPER_STATE_CONFIG } from './stepper-state.config';
import { FormStateMachineConfig, FORM_STATE_CONFIG } from './form-state.config';

type StateMachineConfig = FormStateMachineConfig & StepperStateMachineConfig;

export const STATE_CONFIG: StateMachineConfig = {
  ...FORM_STATE_CONFIG,
  ...STEPPER_STATE_CONFIG,
};
  
export default STATE_CONFIG;
