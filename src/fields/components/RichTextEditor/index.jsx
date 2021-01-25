import React from 'react';
import RichTextEditor from './lib/RichText';
import richTextEditorProps from './rich-text-editor.props';

export default ({ type, value, options, label, htmlid, nullOption, onChange, ...rest }) => (
    <div>
        <div 
            className={'richTextLabel'}
            style={{
              'color': 'rgba(0, 0, 0, 0.54)',
              'padding': 0,
              'fontSize': '0.8rem',
              'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
              'lineHeight': 1,
              'marginBottom': 5,
            }}
        >
        { label } 
        </div>
        <RichTextEditor htmlid={htmlid} value={String(value)} {...richTextEditorProps({ onChange })} />
    </div>
);
