import React from 'react';
import RichTextEditor from './lib/RichText';

export default ({ type, value = '', options, label, nullOption, onChange, ...rest }) => (
    <RichTextEditor value={String(value)} onChange={onChange} {...rest} />
);
