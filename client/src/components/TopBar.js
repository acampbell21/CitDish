import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

const styles = {
  topBar: {
    width: '100%',
    height: '100px',
    backgroundColor: 'rgb(0, 145, 210)',
  },
  topBarIcon: {
    border: '5px solid white',
    backgroundColor: 'rgb(0, 145, 210)',
    color: 'white',
    marginTop: '25px',
  },
}

const toggleBorderColor = () => {
}

const TopBar = ({ path }) => {
  const pathToIcon = { '/account': 'user', '/payment': 'credit card alternative', '/clients': 'address book', '/team': 'users' };

  return(
    <Segment basic style={styles.topBar} textAlign='center'>
      <Icon
        onMouseEnter={this.toggleBorderColor}
        onMouseOut={this.toggleBorderColor}
        circular
        size='huge'
        style={styles.topBarIcon}
        name={pathToIcon[path]}
      />
    </Segment>
  );
}

export default TopBar;
