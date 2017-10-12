import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OAuth } from 'forcejs';
import { Segment, Button, Dimmer, Loader } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { setOauth } from '../actions/oauth';
import axios from 'axios';

class SalesforceOAuth extends Component {
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
        dispatch(setOauth(oauthResult, true));
      })
      .catch( () => {
        dispatch(setFlash('Error Logging In. Try Again.', 'red'));
      })
      .then( () => {
        this.setState({ loaded: true });
    });
  }

  render() {
    if(this.state.loaded)
      return(
        <Segment basic>
          <Button onClick={this.salesforceOAuth}>Login To Salesforce</Button>
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

export default connect()(SalesforceOAuth);
