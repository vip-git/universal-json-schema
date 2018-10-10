import React from 'react';
import RichTextEditor from './lib/RichText';

export default ({ type, value = '', options, label, nullOption, onChange, ...rest }) => (
    <div>
        <div style={{
            color: 'rgba(0, 0, 0, 0.54)',
            padding: 0,
            fontSize: '0.8rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: 1,
            marginBottom: 5,
        }}
        > { label } 
        </div>
        <RichTextEditor value={String(value)} onChange={onChange} {...rest} />
    </div>
);
