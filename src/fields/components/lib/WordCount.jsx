import React from 'react';
import styled from 'react-emotion';

const WordCounter = styled('span')`
  margin-top: 10px;
  padding: 12px;
  background-color: #ebebeb;
  display: inline-block;
`;

export default function WordCount(options) {
  return {
    renderEditor(props, next) {
      const children = next();
      const wordCount = props.value.document
        .getBlocks()
        .reduce((memo, b) => memo + b.text.length, 0);
      return (
        <div>
          <div>{children}</div>
          <WordCounter>Char Count: {wordCount}</WordCounter>
        </div>
      );
    },
  };
}
