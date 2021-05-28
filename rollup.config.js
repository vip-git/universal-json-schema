// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';


const slateESModuleSupport = () => {
  const shelljs = require('shelljs');
  const finalString = `
  function isBackward (selection: Selection): boolean {
    var startNode: Node = selection.anchorNode;
    var startOffset: number = selection.anchorOffset;
    var endNode: Node = selection.focusNode;
    var endOffset: number = selection.focusOffset;

    var position: number = startNode.compareDocumentPosition(endNode);

    return !(position === 4 /* Node.DOCUMENT_POSITION_FOLLOWING */ ||
      (position === 0 && startOffset < endOffset));
  }

  export default isBackward;
  `;
  const shellFileString = new shelljs.ShellString(finalString);
  shellFileString.to('node_modules/selection-is-backward/index.ts');
  return;
}


export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    slateESModuleSupport(),
    typescript(),
    commonjs(),
    terser(),
    json(),
  ]
};