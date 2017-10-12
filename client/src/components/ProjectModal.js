import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Input, Dropdown, Segment, Button, Icon, Divider, Form } from 'semantic-ui-react';

class ProjectModal extends Component { 
  state = { pages: 1, client: '', title: '' };

  newProjectButton() {
    return(
      <Button primary>
        <Icon name='cloud upload' />
          New Project
      </Button>
    );
  }

  clientOptions = () => {
    return this.props.clients.map(client => {
      const { uid: value, name: text } = client;
      return { text, value }
    });
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Make this work with the server
  }

  selectClient = (client) => {
    this.setState({ client });
  }

  pageUploads = () => {
    let pageInputs = [];
    for(let i = 1; i <= this.state.pages; i++) {
      pageInputs.push(
        <Segment key={i} basic>
          <Input label={`Media For Page: ${i}`} type='file' required />
        </Segment>
      );
    }
    return pageInputs;
  }

  render() {
    const { client, title, pages } = this.state;
    const disabled = (client && parseInt(pages, 10) > 0 && title) ? {} : { disabled: true };

    return(
      <Modal
        closeIcon={<Button floated='right' compact negative>X</Button>}
        trigger={this.newProjectButton()}
      >
        <Modal.Header>New Project</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Description>
                <Header>Project Title</Header>
                <Input 
                  required
                  placeholder='Project Title'
                  autoFocus
                  id='title' 
                  value={this.state.projectValue}
                  onChange={this.handleChange}
                />
                <Header>Number Of Pages</Header>
                <Input 
                  required
                  placeholder='Number Of Pages'
                  type='number'
                  id='pages' 
                  value={this.state.pages}
                  onChange={this.handleChange}
                />
                { this.pageUploads() }
                <Header>Client Name</Header>
                <Dropdown
                  placeholder='Select A Client'
                  fluid
                  selection
                  search
                  options={this.clientOptions()}
                  onChange={(e, data) => this.selectClient(data.value) }
                />
            </Modal.Description>
            <Divider hidden />
            <Segment basic textAlign='center'>
              <Button type='button'>
                <Icon name='user' />
                  New Client
              </Button>
              <Button primary type='submit' {...disabled}>
                <Icon name='cloud upload' />
                  Create Project
              </Button>
            </Segment>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { clients: state.clients };
}

export default connect(mapStateToProps)(ProjectModal);