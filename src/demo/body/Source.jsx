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
import Editor, { monaco } from '@monaco-editor/react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Valid from '@material-ui/icons/CheckCircle';
import Invalid from '@material-ui/icons/HighlightOff';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { withStyles } from '@material-ui/core/styles';
import sourceStyles from './editor-styles';

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
    this.editorRef = React.createRef();
  } 

  componentDidMount = () => {
    monaco.init()
    .then((realMonaco) => {
      realMonaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
      realMonaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
          uri: `http://myserver/${this.props.title}`,
          fileMatch: ['*'],
          schema: this.props.schema,
        }],
      });
    })
    .catch((error) => console.error('An error occurred during initialization of Monaco: ', error));
  }

  handleEditorDidMount = (_, editor) =>{
    this.editorRef.current = editor;
    // Now you can use the instance of monaco editor
    // in this component whenever you want
    this.listenEditorChanges();
  }

  listenEditorChanges = () => {
    this.editorRef.current.onDidChangeModelContent(ev => {
      this.onBeforeChange(this.editorRef.current.getValue());
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

  onBeforeChange = (data) => {
    const { onChange } = this.props;
    const parsed = isValid(data);

    this.setState({
      valid: parsed,
      source: data,
    });
    if (parsed && onChange) {
      onChange(parsed);
    }
  }

  render() {
    const { source, valid, isOpen } = this.state;
    const { classes, title, hasSchemaError, schema } = this.props;
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
            <Editor
              height={400}
              language={title === 'uiSchema.json' ? 'typescript' : 'json'}
              value={source}
              options={{
                language: 'json',
                readOnly: false,
                minimap: {
                  enabled: false,
                },
              }}
              editorDidMount={this.handleEditorDidMount}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(sourceStyles)(Source);
