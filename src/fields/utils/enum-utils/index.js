/* eslint-disable import/prefer-default-export */
export { default as valuesToOptions } from './values-to-options';

export const isEnum = (schema) => schema.enum || schema.anyOf || schema.oneOf;

export const isSingleSelect = (schema) => schema.type === 'string' && (schema.enum || schema.oneOf);

export const isMultiSelect = (schema) => schema.parsedArray && (schema.enum || schema.anyOf);

export const getEnumTitle = (schema) => schema.items?.title || schema.title || '';
