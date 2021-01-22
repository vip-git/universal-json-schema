/* eslint-disable import/prefer-default-export */
export { default as valuesToOptions } from './values-to-options';

export const isEnum = (schema) => schema.enum || schema.anyOf || schema.oneOf;

export const getEnumTitle = (schema) => schema.items?.title || schema.title || '';
