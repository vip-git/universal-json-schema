import React from "react";
import { css } from "emotion";

export default function WordCount(options) {
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
            className={css`
              margin-top: 10px;
              padding: 12px;
              background-color: #ebebeb;
              display: inline-block;
            `}
          >
            Char Count: {wordCount}
          </span>
        </div>
      );
    }
  };
}
