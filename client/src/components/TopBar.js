import React, { Component } from 'react';
import { Segment, Icon } from 'semantic-ui-react';

class TopBar extends Component {
  state = { borderColor: 'white' };

  pathToIcon() {
    const paths = {
      '/account': 'user', '/payment': 'credit card alternative',
      '/clients': 'address book', '/team': 'users'
    };
    return paths[this.props.path]
  }

  toggleBorderColor = () => {
    if(this.state.borderColor === 'rgb(0, 145, 210)')
      this.setState({ borderColor: 'white' });
    else
      this.setState({ borderColor: 'rgb(0, 145, 210)' });
  }

  render() {
    return(
      <Segment basic style={styles.topBar}>
        <Segment
          basic
          clearing
          style={{
            ...styles.topBarSegment,
            border: `5px solid ${this.state.borderColor}`
          }}
          onMouseEnter={this.toggleBorderColor}
          onMouseOut={this.toggleBorderColor}
        >
          <Icon
            fitted
            size='huge'
            style={styles.topBarIcon}
            name={this.pathToIcon()}
          />
        </Segment>
      </Segment>
    );
  }
}

const styles = {
  topBar: {
    width: '100%',
    height: '100px',
    backgroundColor: 'rgb(0, 145, 210)',
    marginTop: '0',
  },
  topBarSegment: {
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '112px',
    height: '112px',
    backgroundColor: 'rgb(0, 145, 210)',
    margin: '30px auto',
  },
  topBarIcon: {
    color: 'white',
  },
}

export default TopBar;
