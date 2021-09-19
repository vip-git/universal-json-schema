export type UIValidationMinLength = 'minLength';
export type UIValidationMaxLength = 'maxLength';
export type UIValidationMaximum = 'maximum';
export type UIValidationMinimum = 'minimum';
export type UIValidationPattern = 'pattern';

type ValidationNames = UIValidationMinLength
| UIValidationMaxLength
| UIValidationMaximum
| UIValidationMinimum
| UIValidationPattern;
type ValidationValues = {
    'value': number;
    'message': string;
    'inline': boolean;
};

export type UISchemaValidations = {
    [key in ValidationNames]?: ValidationValues;
};
