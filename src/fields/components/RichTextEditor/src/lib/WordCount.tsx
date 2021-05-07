import React from 'react';

export default function WordCount() {
  return {
    renderEditor(props, editor, next) {
      const children = next();
      const wordCount = editor.value.document
        .getBlocks()
        .reduce((memo, b) => memo + b.text.length, 0);
      return (
        <div>
          <div>{children}</div>
          <span
            style={{
              marginTop: 10,
              padding: 12,
              backgroundColor: '#ebebeb',
              display: 'inline-block',
            }}
          >
            Char Count:
            {' '}
            {wordCount}
          </span>
        </div>
      );
    },
  };
}
