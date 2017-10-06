import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OAuth, DataService } from 'forcejs';
import { Segment, Button } from 'semantic-ui-react';

class SalesForceClients extends Component {
  salesforceOAuth = () => {
    let oauth = OAuth.createInstance('3MVG9g9rbsTkKnAUD1XhlRDobc7ZMhSWknTqS.q86SSXGhWZgzkKUgrTOo61VlVyaEPbCHZOBF4dWwVDe9Vpq', 'https://login.salesforce.com', 'http://localhost:3000/oauth');
    oauth.login()
      .then(oauthResult => {
        DataService.createInstance(oauthResult, { useProxy: true });
        loadContacts();
    });

    let loadContacts = () => {
      let service = DataService.getInstance();
      service.query('select id, Name from contact LIMIT 50')
        .then(response => {
          this.props.dispatch({ type: 'SET_CONTACTS', contacts: response.records });
      });
    }
  }

  render() {
    return(
      <Segment>
        <Button onClick={this.salesforceOAuth}>Login To SalesForce</Button>
      </Segment>
    )
  }
}

export default connect()(SalesForceClients);
