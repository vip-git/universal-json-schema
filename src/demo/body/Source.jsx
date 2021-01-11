/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
/* eslint-disable no-void */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React from 'react';
import classNames from 'classnames';
import brace from 'brace';
// import AceEditor from 'react-ace';
import * as monaco from 'monaco-editor';
import 'brace/mode/json';
import 'brace/theme/textmate';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Valid from '@material-ui/icons/CheckCircle';
import Invalid from '@material-ui/icons/HighlightOff';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { withStyles } from '@material-ui/core/styles';
import sourceStyles from './editor-styles';

// Since packaging is done by you, you need
// to instruct the editor how you named the
// bundles that contain the web workers.
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  }
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '100%',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const deepStringify = (givenVal) => {
  // Note: cache should not be re-used by repeated calls to JSON.stringify.
  const cache = [];
  return JSON.stringify(givenVal, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) return;

      // Store value in our collection
      cache.push(value);
    }
    return value;
  }, 2);
};

const isValid = (value) => {
  let obj;
  try {
    obj = JSON.parse(value);
  }
  catch (e) {
    return false;
  }
  return obj;
};

class Source extends React.Component {
  constructor(props) {
    super(props);
    const source = deepStringify(this.props.source);
    this.state = {
      source,
      valid: isValid(source),
      isOpen: true,
    };
  }

  componentDidMount() {
    const jsonCode = [
      JSON.stringify(this.props.source, null, 2),
    ].join('\n');
    const modelUri = monaco.Uri.parse(`a://b/${this.props.title}.json`); // a made up unique URI for our model
    const model = monaco.editor.createModel(jsonCode, 'json', modelUri);

    // configure the JSON language support with schemas and schema associations
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [this.props.schema],
    });
    // eslint-disable-next-line no-undef
    monaco.editor.create(document.getElementById(this.props.title), {
      model,
    });
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const source = deepStringify(nextProps.source);
    this.setState({
      source,
      valid: isValid(source),
    });
  }

  onChange = (newValue) => {
    this.setState({ source: newValue });
  }

  onBeforeChange = (editor, data, value) => {
    const { onChange } = this.props;
    const parsed = isValid(editor);

    this.setState({
      valid: parsed,
      source: editor,
    });
    if (parsed && onChange) {
      onChange(parsed);
    }
  }

  render() {
    const { source, valid, isOpen } = this.state;
    const { classes, title, hasSchemaError } = this.props;
    const getInValidIcon = hasSchemaError ? WarningRoundedIcon : Invalid;
    const Icon = valid && !hasSchemaError ? Valid : getInValidIcon;
    return (
      <div 
        className={classes.root} 
        style={title === 'uiSchema' ? { 
          marginBottom: 10, 
          cursor: 'pointer', 
        } : { 
          cursor: 'pointer',
        }} 
      >
        <div className={classNames(classes.ctr, { 
          [classes.invalid]: !valid, 
          [classes.warning]: hasSchemaError && valid, 
        })}
        >
          <div
            onClick={() => this.setState({
              isOpen: !isOpen,
            })}
          >
            <HtmlTooltip
              interactive
              title={(
                <>
                  <div style={{ display: 'flex' }}>
                    <Icon fontSize={'default'} className={classes.icon} style={{ marginRight: 15 }} />
                    <Typography color='inherit' variant={'body1'}>
                          Your 
                          {' '}
                          {title}
                          {' is '}
                          <b>{valid && !hasSchemaError ? 'Valid' : 'InValid'}</b>
                    </Typography>
                  </div>
                  {hasSchemaError && (
                    <pre style={{ padding: 10, fontSize: '1rem', color: 'darkred' }}>
                      {JSON.stringify(hasSchemaError, null, 2)}
                    </pre>
                  )}
                </>
              )}
            >
              <Icon fontSize={'default'} className={classes.icon} />
            </HtmlTooltip>
            
            <div
              className={classes.title}
            >
              <p>{title}</p>
              <span> 
                  {' '}
                  {isOpen ? '[-]' : '[+]' }
                  {' '}
              </span>
            </div>
          </div>
          <div
            className={classes.source}
            style={{
              display: isOpen ? 'block' : 'none',
            }}
          >
            {/* <AceEditor
              mode='json'
              theme='textmate'
              value={source}
              onChange={this.onBeforeChange}
              name='ace_editor_1'
              editorProps={{ $blockScrolling: true }}
              showPrintMargin
              showGutter
              highlightActiveLine
              width={'100%'}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            /> */}
            <div id={title} style={{ height: '100vh' }} />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(sourceStyles)(Source);
