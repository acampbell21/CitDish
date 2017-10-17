import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Input, Dropdown, Segment, Button, Icon, Divider, Form, Dimmer, Loader } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { addProject } from '../actions/projects';
import { withRouter } from 'react-router-dom';
import MediaInput from './MediaInput';
import axios from 'axios';

class ProjectModal extends Component {
  state = {
    clients: [],
    title: '',
    files: [],
    fileUploading: false,
  };

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
    const { clients, title, files } = this.state;
    const { dispatch, history } = this.props;

    dispatch(addProject(clients, title, files, history));
  }

  selectClient = (clients) => {
    this.setState({ clients });
  }

  updateMediaFile = (acceptedFiles, rejectedFiles) => {
    this.setState({ fileUploading: true });

    const { dispatch } = this.props;

    let data = new FormData();

    acceptedFiles.forEach(file => {
      data.append(file.name, file);
    });

    axios.post('/api/images/project_images', data)
      .then(res => {
        const { data, headers } = res;
        this.setState({ files: [...this.state.files, ...data]});
        dispatch(setHeaders(headers));
      })
      .catch(res => {
        dispatch(setFlash('Error Uploading File. Please Try Again.', 'red'));
        dispatch(setHeaders(res.headers));
      })
      .then( () => {
        this.setState({ fileUploading: false });
    });
  }

  mediaInputs = () => {
    return this.state.files.map( (file, i) => {
      return(
        <MediaInput
          key={i}
          index={i}
          updateMediaFile={this.updateMediaFile}
        />
      );
    });
  }

  render() {
    const { clients, title, files, fileUploading } = this.state;
    const disabled = (clients.length > 0 && files.length > 0 && title) ? {} : { disabled: true };

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
                  fluid
                  id='title'
                  value={this.state.projectValue}
                  onChange={this.handleChange}
                />
                <Header>Client Name</Header>
                <Dropdown
                  placeholder='Select A Client'
                  fluid
                  multiple
                  selection
                  search
                  options={this.clientOptions()}
                  onChange={(e, data) => this.selectClient(data.value) }
                />
                <Divider horizontal>Media Upload</Divider>
                { fileUploading ?
                  <Dimmer active>
                    <Loader>Processing Upload. Please Wait...</Loader>
                  </Dimmer> :
                  <MediaInput
                    index={0}
                    addMediaInput={this.addMediaInput}
                    removeMediaInput={this.removeMediaInput}
                    updateMediaFile={this.updateMediaFile}
                    files={files}
                  />
                }
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

export default withRouter(connect(mapStateToProps)(ProjectModal));
