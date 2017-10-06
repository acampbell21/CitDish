import React, { Component } from 'react';
import { 
  Container,
  Header, 
  Segment, 
  Button, 
  Icon,
  Grid, 
  Divider,
  Image,
  Modal,
  Input,
  Form,
} from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';

const styles = {
  users: {
    backgroundColor: '#ededed',
    width: '400px',
    fontSize: '18px',
  },
  add: {
    backgroundColor: 'rgb(0, 145, 210)',
    color: 'white',
    fontSize: '18px',
    width: '400px', 
  },
  submit: {
    backgroundColor: 'rgb(0, 145, 210)',
    color: 'white',   
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '600px',
  },
  modal: {
    width: '500px',
    justifyContent: 'center',
  },
  dropzone: {
      marginBottom: '10px', 
      border: 'dashed 1px black',
      height: '55px',
      textAlign: 'center'
  }
  
}

class Team extends Component {
  state = { name: '', email: '', phone: '', users: [] }
  
  componentDidMount() {
    axios.get('/api/team')
    .then(res => {
      this.setState({ users: res.data })
    });
  }

  userDestroy() {
    const { name, email, phone } = this.state;
    axios.delete('/api/team', {user: { name, email, phone } }) 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    axios.post('/invitation/send', {user: { name, email, phone } })
  }

  handleEdit = (e) => {
    const { name, phone } = this.state;
    axios.patch('/api/team', {user: { name, phone } })
  }

  handleChange = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }
  
  addUserButton() {
    return(
      <Button style={styles.submit}>Invite User</Button>
    )
  }

  editUserButton() {
    return(
      <Icon button color='yellow' name='write' />
    )
  }
  
  destroyUserButton() {
    return(
      // <Icon button color='red' name='remove circle' onClick={this.handleDestroy()} />      
      <Button onClick={this.userDestroy()}>Delete</Button>
    )
  }

  editUserModal = () => {
    const { name, email, phone, user } = this.state;
    return(
      <Modal style={styles.modal} closeIcon={<Button floated='right' compact tiny>X</Button>} trigger={this.editUserButton()} >
        <Modal.Header>EDIT USER</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleEdit}>
            <Form.Field>
              <label>Name</label>
              <input value={name} id='name' onChange={this.handleChange} autoFocus placeholder={name} />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input value={phone} id='phone' onChange={this.handleChange} placeholder='Phone' />
            </Form.Field>
            <Button style={styles.submit}>
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

  displayUsers() {
    const { users } = this.state
    return this.state.users.map(user => 
      <Segment style={styles.users}>
        <span>{user.name}</span>
        {this.destroyUserButton()}
        <Icon button color='green' name='mail' />
        {this.editUserModal()}
      </Segment>
    )
  }

  render() {
    const { name, email, phone } = this.state;
    return(
      <Container style={styles.container}>
        <Header textAlign="right" as="h2">
          Team
        </Header>
        <span>{ this.displayUsers() }</span>
        <br />
        <Modal style={styles.modal} closeIcon={<Button floated='right' compact tiny>X</Button>} trigger={this.addUserButton()}>
          <Modal.Header>ADD USER</Modal.Header>
          <Modal.Content onOpen>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Name</label>
                <input value={name} id='name' onChange={this.handleChange} autoFocus placeholder='Name' />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input value={email} id='email' onChange={this.handleChange} placeholder='Email' />
              </Form.Field>
              <Form.Field>
                <label>Phone</label>
                <input value={phone} id='phone' onChange={this.handleChange} placeholder='Phone' />
              </Form.Field>
              <Button handleSubmit style={styles.submit}>
                Send
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
        {/* {this.editUserModal()} */}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Team);