import React, { Component } from 'react';
import noProjectsPlaceholder from '../images/no-projects-placeholder.jpg';
import { Segment, Button, Image, Divider, Icon, Modal, Header, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import missingAvatar from '../images/missing-avatar.png'
import SalesForceClients from './SalesForceClients';

class Portfolio extends Component {
  state = { client: null };

  newProjectButton() {
    return(
      <Button primary>
        <Icon name='cloud upload' />
          New Project
      </Button>
    );
  }

  clientOptions = () => {
    return this.props.contacts.map(contact => {
      const { Id: value, Name: text } = contact;
      return { text, value }
    });
  }

  render() {
    const disabled = this.state.client ? {} : { disabled: true };

    return(
      <Segment basic>
        <SalesForceClients />
        <Modal closeIcon={<Button floated='right' compact negative>X</Button>} trigger={this.newProjectButton()}>
          <Modal.Header>New Project</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Client Name</Header>
              <Dropdown placeholder='Select A Client' fluid selection options={this.clientOptions()} />
            </Modal.Description>
            <Divider hidden />
            <Segment basic textAlign='center'>
              <Button>
                <Icon name='user' />
                  New Client
              </Button>
              <Button primary {...disabled}>
                <Icon name='cloud upload' />
                  Create Project
              </Button>
            </Segment>
          </Modal.Content>
        </Modal>
        <Divider hidden />
        <Image size='medium' src={noProjectsPlaceholder} alt='No Projects Placeholder Image' />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { projects: state.projects, contacts: state.contacts }
}

export default connect(mapStateToProps)(Portfolio);
