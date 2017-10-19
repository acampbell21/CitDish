import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Header,
  Grid, 
  Segment,
  Icon,
  Button,
} from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import InviteUserModal from './InviteUserModal';

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
  },
  grid: {
    paddingTop: '110px', 
    height: '90vh',
    overflow: 'scroll',
    paddingBottom: '11px',
  },
  modal: {
    width: '500px',
    justifyContent: 'center',
  },
  submit: {
    backgroundColor: 'rgb(0, 145, 210)',
    color: 'white',   
  },
}

class Team extends Component {
  state = { 
    name: '', 
    email: '', 
    phone: '', 
    role: '', 
    users: [],
    editUser: null,
    newInvite: false,
  }
  
  componentDidMount() {
    const { dispatch } = this.props;    
    axios.get('/api/team')
    .then(res => {
      this.setState({ users: res.data })
      dispatch(setHeaders(res.headers))
    })
    .catch(res => {
      dispatch(setFlash('Error fetching users', 'red'))
      dispatch(setHeaders(res.headers))
    })
  }

  userDestroy = (id) => {
    const { dispatch } = this.props;    
    axios.delete(`/api/team/${id}`)
    .then(res => {
      this.setState({ users: res.data })
      dispatch(setHeaders(res.headers))
    })
    .catch(res => {
      dispatch(setFlash('Error deleting user', 'red'))
      dispatch(setHeaders(res.headers))
    })
  }  
  
  handleChange = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }
  
  destroyUserButton(id) {
    if (this.props.user.id !== id)
      return( 
        <Icon button color='red' name='remove circle' onClick={() => this.userDestroy(id)} />      
    )
  }

  setEditUser = (editUser) => {
    this.setState({ editUser });
  }
  
  setUsers = (user) => {
    const users = this.state.users.map(u => {
      if(user.id === u.id)
        return user
      return u
    })
    this.setState({users, editUser: null})
  }

  addUser = (user) => {
    this.setState({ users: [...this.state.users, user], newInvite: false });
  }
  
  displayUsers = () => {
    return this.state.users.map(user => {
      const { name, phone, id, role } = user;
      return(
        <Segment style={styles.users}>
        <span>{name}</span>
          { role === 'admin' &&  <Icon tiny name="legal" /> }
          {this.destroyUserButton(id)}
          <Icon button color='green' name='mail' />
          <Icon button color='yellow' name='write' onClick={() => this.setEditUser(user)}/>
          <br />
        </Segment>
      )
    });
  }

  render() {
    const { name, email, phone, role, editUser, newInvite } = this.state;
    return(
      <Grid verticalAlign='middle' centered padded="vertically" style={styles.grid}>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Container style={styles.container}>
            <Header textAlign="center" as="h2">
              Team
            </Header>
            <span>{ this.displayUsers() }</span>
            <br />
            <InviteUserModal 
              addUser={this.addUser}
              newInvite={newInvite}
            />
            <EditUserModal 
              editUser={editUser}  
              setEditUser={this.setEditUser} 
              setUsers={this.setUsers}
            />
            <Button 
              onClick={() => this.setState({ newInvite: true })}
              style={styles.submit}
            >
              Invite User
            </Button>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Team);