// Library
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import VersionContext from './context/version.context';

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
      currentVersion: 3,
      selectedDemo: examples[3][selectedHash],
    };
  }

  onSelectMenuItem = (type, keyType) => () => {
    const selectedHash = keyType in examples[this.state.currentVersion] ? keyType : 'simple';
    window.location.hash = keyType;
    this.setState({ selectedDemo: examples[this.state.currentVersion][selectedHash] });
  }

  render() {
    const { classes } = this.props;
    return (
      <VersionContext.Provider value={this.state.currentVersion}>
        <div className={classes.root}>
          <Menu 
            onSelectMenuItem={this.onSelectMenuItem} 
            setVersion={(currentVersion) => {
              const selectedHash = hash in examples[currentVersion] ? hash : 'simple';
              this.setState({ 
                currentVersion, 
                selectedDemo: examples[currentVersion][selectedHash],
              });
            }}
          />
          <Body 
            selectedDemo={this.state.selectedDemo} 
          />
        </div>
      </VersionContext.Provider>
    );
  }
}

export default withStyles(styles)(Demo);
