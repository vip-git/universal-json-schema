const getschemaproperties = ({
    schema,
    data,
    uiSchema,
    xhrSchema
}): any => Object.keys(schema.properties).map((propSchema, propKey) => ({
    schema: schema.properties[propSchema],
    key: propKey,
    objectData: data,
    path: '',
    required: false,
    data: data[propSchema],
    uiSchema: uiSchema[propSchema],
    xhrSchema: xhrSchema[propSchema],
    validation: {},
    definitions: {}
}));

export default getschemaproperties;
