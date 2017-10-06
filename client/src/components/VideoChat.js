import React, { Component } from 'react';
import axios from 'axios';
import { preloadScript } from 'opentok-react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

class VideoChat extends Component {
  state = { apiKey: '', sessionId: '', token: '', ready: false };

  componentWillMount() {
    axios.get('/api/opentok_session')
      .then(res => {
        const { session: { api_key: apiKey, session_id: sessionId }, token} = res.data;
        this.setState({ apiKey, sessionId, token, ready: true });
      })
      .catch(res => {
        this.props.dispatch(setFlash('Error Creating Opentok Session', 'error'));
      })
  }

  loadVideoChat = () => {
    const { ready, apiKey, sessionId, token } = this.state;

    if(ready)
      return(
        <OTSession apiKey={this.state.apiKey} sessionId={this.state.sessionId} token={this.state.token}>
          <OTPublisher />
          <OTStreams>
            <OTSubscriber />
          </OTStreams>
        </OTSession>
      );
    else
      return(
        <Dimmer active>
          <Loader>Initializing Video Chat...</Loader>
        </Dimmer>
      );
  }

  render() {
    return(
      <Segment basic>
        { this.loadVideoChat() }
      </Segment>
    );
  }
}

export default connect()(VideoChat);
