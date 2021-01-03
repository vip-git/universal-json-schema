import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from './menu';
import Body from './body';
import './main.scss'; // eslint-disable-line import/no-unresolved,import/no-extraneous-dependencies
import examples from './examples';

const styles = ({});
const hash = window.location.hash.replace('#', '');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const selectedHash = hash in examples ? hash : 'simple';
    this.state = {
      selectedDemo: examples[selectedHash],
    };
  }

  onSelectMenuItem = (type, keyType) => () => {
    const selectedHash = keyType in examples ? keyType : 'simple';
    window.location.hash = keyType;
    this.setState({ selectedDemo: examples[selectedHash] });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Menu onSelectMenuItem={this.onSelectMenuItem} />
        <Body selectedDemo={this.state.selectedDemo} />
      </div>
    );
  }
}

export default withStyles(styles)(Demo);
