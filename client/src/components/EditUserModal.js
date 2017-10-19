import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Header, 
  Segment, 
  Button, 
  Icon,
  Modal,
  Checkbox,
  Dropdown,
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
  submit: {
    backgroundColor: 'rgb(0, 145, 210)',
    color: 'white',   
  },
  modal: {
    width: '500px',
    justifyContent: 'center',
  },
  text: {
    textTransform: 'uppercase',
  },
}

class EditUserModal extends Component {
  state = { editUser: {...this.props.user} }

  componentDidUpdate(prevProps) {
    if(prevProps.editUser !== this.props.editUser)
      this.setState({ editUser: this.props.editUser })
  }

  handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target
    this.setState({ editUser: {...this.state.editUser, [id]: value }})
  }

  handleCheck = (e, data) => {
    const role = this.state.editUser.role === 'user' ? 'admin' : 'user';
    const editUser = { ...this.state.editUser, role }
    this.setState({ editUser: editUser });
  }
  
  editUser(id) {
    const { name, phone, role } = this.state.editUser;
    const { dispatch } = this.props;
    axios.put(`/api/team/${id}`, { user: { name, phone, role } })
    .then(res => {
      this.props.setUsers(res.data)
      dispatch(setHeaders(res.headers))        
    })
    .catch(res => {
      dispatch(setFlash('Error editing user', 'red'))
      dispatch(setHeaders(res.headers))
    })
  }
  
  adminCheck(id, role) {
    if (this.props.user.id !== id)
      return( 
      <Checkbox
        label='Admin'
        input='admin'
        checked={role === 'admin'}
        onChange={this.handleCheck}
        checkbox
      />
    )
  }

  render() {
    if(this.state.editUser) {
      const { name, phone, id, role } = this.state.editUser;
      return(
        <Modal 
          style={styles.modal} 
          closeIcon={<Button onClick={() => this.setState({ editUser: null })} floated='right' compact tiny>X</Button>} 
          open={ this.props.editUser ? true : false }
        >
          <Modal.Header style={styles.text}>edit user</Modal.Header>
          <Modal.Content>
            <Form onSubmit={ () => this.editUser(id) }>
              <Form.Field>
                <label>Name</label>
                <input value={name} id='name' onChange={this.handleChange} autoFocus />
              </Form.Field>
              <Form.Field>
                <label>Phone</label>
                <input value={phone} id='phone' onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                {this.adminCheck(id, role)}
              </Form.Field>
              <Button editUser style={styles.submit}>
                Submit
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      )
    } else
      return null
  }
}


const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(EditUserModal);