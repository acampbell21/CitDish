import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Header, 
  Segment, 
  Button, 
  Icon,
  Checkbox,
  Dropdown,
  Modal,
  Form,
} from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import axios from 'axios';

const styles = {
  users: {
    backgroundColor: '#ededed',
    width: '400px',
    fontSize: '18px',
  },
  modal: {
    width: '500px',
    justifyContent: 'center',
  },
}

class InviteUserModal extends Component {
  state = { ...this.props }
  
  handleChange = (e, data) => {
    if(data && data.id === 'role') 
      this.setState({ role: data.checked ? 'admin' : 'user' });
    else {
      const { id, value } = e.target
      this.setState({ [id]: value })
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, role } = this.state;
    const { dispatch, addUser } = this.props;

    axios.post('/invitation/send', {user: { name, email, phone, role } })
      .then(res => {
        const { data, headers } = res;
        dispatch(setFlash('User has been invited', 'green'))        
        addUser(data)
        dispatch(setHeaders(headers));
      })
      .catch(res => {
        dispatch(setFlash('Error inviting user', 'red'))        
        dispatch(setHeaders(res.headers));
    });
  }

  render() {
    const { name, email, phone, role } = this.state;    
    return(
      <Modal 
        style={styles.modal}
        open={this.props.newInvite}
        closeIcon={<Button floated='right' compact tiny>X</Button>} 
      >
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
            <Form.Field>
              <Checkbox
              value={role}
              id='role'
              label='Admin'
              input='admin'
              onChange={this.handleChange}
            /> 
            </Form.Field>
            <Button handleSubmit style={styles.submit}>
              Send
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps)(InviteUserModal);