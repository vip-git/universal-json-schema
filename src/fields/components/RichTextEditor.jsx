import React from 'react';
import RichTextEditor from './lib/RichText';

export default ({ type, value, options, label, nullOption, onChange, ...rest }) => (
    <div>
        <div style={{
            'color': 'rgba(0, 0, 0, 0.54)',
            'padding': 0,
            'fontSize': '0.8rem',
            'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
            'lineHeight': 1,
            'marginBottom': 5,
            '&> div > div': {
                borderBottom: 'solid 1px #0000001c !important',
                marginTop: 14,
                marginBottom: 10,
                marginRight: 15,
                paddingBottom: 10,
            },
        }}
        > { label } 
        </div>
        <RichTextEditor value={(value) ? String(value) : '<p></p>'} onChange={onChange} {...rest} />
    </div>
);
