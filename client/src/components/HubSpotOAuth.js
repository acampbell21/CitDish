import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class HubSpotOAuth extends Component {
  state = { openWindow: false };

  initiateOAuth = () => {
    const { clientId, redirectUri, scopes } = this.props;
    const windowName = 'HubSpot OAuth';
    const windowOptions = '100x100';
    const baseUrl = "https://app.hubspot.com/oauth/authorize";

    window.open(
      `${baseUrl}?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`, 
      windowName,
      windowOptions
    );

    this.setState({ openWindow: false });
    return null;
  }

  openWindow = () => {
    this.setState({ openWindow: true });
  }

  render() {
    if(this.state.openWindow)
     return(this.initiateOAuth());
    else
     return(
       <Button onClick={this.openWindow}>Login With HubSpot</Button>
     );
  }
}

export default HubSpotOAuth;