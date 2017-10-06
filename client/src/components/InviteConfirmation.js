import React, { Component } from 'react';
import { Container, Form, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { acceptInvitation } from '../actions/invitations';
import { setFlash } from '../actions/flash';

class InviteConfirmation extends Component {
  state = { password: '', password_confirmation: '' }

  handleSubmit = () => {
    const { password, password_confirmation } = this.state;
    const { dispatch, history, location: { search } } = this.props;
    const invitation_token = search.split("?token=")[1]

    if(password !== password_confirmation) {
      dispatch(setFlash('passwords do not match', 'red'));
    } else if(password.length < 8) {
      dispatch(setFlash('password minimum length is 8', 'red'));
    } else {
      dispatch(acceptInvitation({ ...this.state, invitation_token }, history))
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { password, password_confirmation } = this.state;
    return (
      <Container>
      <Form onSubmit={this.handleSubmit}>
        <Header textAlign='center'>Citizen Dash Password Confirmation</Header>
        <Form.Field>
          <label>Password</label>
          <input
            name='password'
            placeholder='Password'
            type='password'
            value={password}
            onChange={this.handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password Confirmation</label>
          <input
            name='password_confirmation'
            placeholder='Password Confirmation'
            type='password'
            required
            value={password_confirmation}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>
      </Container>
    );
  }
}

export default connect()(InviteConfirmation);