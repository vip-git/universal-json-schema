import React from 'react';
import Plain from 'slate-plain-serializer';
import Html from 'slate-html-serializer';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';

import initialValue from './value.json';
import { Button, Icon, Toolbar } from './components';
import WordCount from './WordCount';
import SoftBreak from './SoftBreak';

const plugins = [WordCount(), SoftBreak()];

/**
 * Tags to blocks.
 *
 * @type {Object}
 */

const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six',
};
  
  /**
   * Tags to marks.
   *
   * @type {Object}
   */
  
const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code',
};
/**
 * Serializer rules.
 *
 * @type {Array}
 */

export const RULES = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'code':
            return (
                <pre>
                  <code>{children}</code>
                </pre>
            );
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>;
          case 'quote':
            return <blockquote>{children}</blockquote>;
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underline':
            return <u>{children}</u>;
        }
      }
    },
  },
];

export const serializer = new Html({ rules: RULES });

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

/**
 * The rich text example.
 *
 * @type {Component}
 */

class RichText2 extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: serializer.deserialize(this.props.value), // Value.fromJSON(initialValue)
  }


  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value });
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    }
    else if (isItalicHotkey(event)) {
      mark = 'italic';
    }
    else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    }
    else if (isCodeHotkey(event)) {
      mark = 'code';
    }
    else {
      return next();
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault();

    this.editor.change((change) => {
      change.toggleMark(type);
    });
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault();

    this.editor.change((change) => {
      const { value } = change;
      const { document } = value;

      // Handle everything but list buttons.
      if (type !== 'bulleted-list' && type !== 'numbered-list') {
        const isActive = this.hasBlock(type);
        const isList = this.hasBlock('list-item');

        if (isList) {
          change
            .setBlocks(isActive ? DEFAULT_NODE : type)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list');
        }
        else {
          change.setBlocks(isActive ? DEFAULT_NODE : type);
        }
      }
      else {
        // Handle the extra wrapping required for list buttons.
        const isList = this.hasBlock('list-item');
        const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type == type));

        if (isList && isType) {
          change
            .setBlocks(DEFAULT_NODE)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list');
        }
        else if (isList) {
          change
            .unwrapBlock(
              type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list',
            )
            .wrapBlock(type);
        }
        else {
          change.setBlocks('list-item').wrapBlock(type);
        }
      }
    });
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = (type) => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = (type) => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  }

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = (editor) => {
    this.editor = editor;
  }


  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state;
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock('list-item') && parent && parent.type === type;
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = (props, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  }
  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    return (
      <div>
        <Toolbar>
          {this.renderMarkButton('bold', 'format_bold')}
          {this.renderMarkButton('italic', 'format_italic')}
          {this.renderMarkButton('underlined', 'format_underlined')}
          {this.renderMarkButton('code', 'code')}
          {this.renderBlockButton('heading-one', 'looks_one')}
          {this.renderBlockButton('heading-two', 'looks_two')}
          {this.renderBlockButton('block-quote', 'format_quote')}
          {this.renderBlockButton('numbered-list', 'format_list_numbered')}
          {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
        </Toolbar>
        <Editor
          spellCheck
          autoFocus
          placeholder='Enter some rich text...'
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          plugins={plugins}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

/**
 * Export.
 */
export default RichText2;
