import React from 'react';
import classNames from 'classnames';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/textmate';
import Valid from '@material-ui/icons/CheckCircle';
import Invalid from '@material-ui/icons/HighlightOff';
import { withStyles } from '@material-ui/core/styles';
import sourceStyles from './editor-styles';

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
    const source = JSON.stringify(this.props.source, null, 2);
    this.state = {
      source,
      valid: isValid(source),
    };
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const source = JSON.stringify(nextProps.source, null, 2);
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
    const { source, valid } = this.state;
    const { classes, title } = this.props;
    const Icon = valid ? Valid : Invalid;
    return (
      <div className={classes.root}>
        <div className={classNames(classes.ctr, { [classes.invalid]: !valid })}>
          <div>
            <Icon fontSize={'default'} className={classes.icon} />
            <div className={classes.title}>
              <p>{title}</p>
            </div>
          </div>
          <div className={classes.source}>
            <AceEditor
              mode='json'
              theme='textmate'
              value={source}
              onChange={this.onBeforeChange}
              name='ace_editor_1'
              editorProps={{ $blockScrolling: true }}
              showPrintMargin
              showGutter
              highlightActiveLine
              width={title === 'JSONSchema' ? '100%' : 500}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(sourceStyles)(Source);
