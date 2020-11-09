import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from './menu';
import Body from './body';
import './main.scss'; // eslint-disable-line import/no-unresolved,import/no-extraneous-dependencies
import examples from './examples';

const styles = ({});

class Demo extends React.Component {
  state = {
    selectedDemo: examples.simple,
  }

  componentDidMount() {
    const selectedHash = window.location.hash.replace('#', '');
    if (examples[selectedHash]) {
      this.setState({ selectedDemo: examples[selectedHash] });
    }
  }

  onSelectMenuItem = (type, keyType) => () => {
    window.location.hash = keyType;
    this.setState({ selectedDemo: type });
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
