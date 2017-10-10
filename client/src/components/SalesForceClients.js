import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OAuth, DataService } from 'forcejs';
import { Segment, Button, Dimmer, Loader } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { setOauth, setClients } from '../actions/oauth';
import axios from 'axios';

class SalesForceClients extends Component {
  state = { loaded: false, appId: '', loginUrl: 'https://login.salesforce.com', oauthCallbackUrl: '' };

  componentDidMount() {
    axios.get('/api/salesforce_creds')
      .then(res => {
        const { appId, oauthCallbackUrl } = res.data;
        this.setState({ appId, oauthCallbackUrl });
      })
      .catch(res => {
        this.props.dispatch(setFlash('Error Getting Salesforce Data. Try Again!', 'error'));
      })
      .then(() => {
        this.setState({ loaded: true });
      })
  }

  salesforceOAuth = () => {
    this.setState({ loaded: false });
    const { dispatch } = this.props;
    const { appId, loginUrl, oauthCallbackUrl } = this.state;
    const oauth = OAuth.createInstance(appId, loginUrl, oauthCallbackUrl);

    oauth.login()
      .then(oauthResult => {
        dispatch(setOauth(oauthResult));
        dispatch(setClients(() => this.setState({ loaded: true })));
      })
      .catch( () => {
        this.setState({ loaded: true });
    });
  }

  render() {
    if(this.state.loaded)
      return(
        <Segment>
          <Button onClick={this.salesforceOAuth}>Login To SalesForce</Button>
        </Segment>
      )
    else
      return(
        <Dimmer active>
          <Loader>Loading SalesForce Integration...</Loader>
        </Dimmer>
      );
  }
}

export default connect()(SalesForceClients);
