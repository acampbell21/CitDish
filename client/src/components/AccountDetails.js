import React, { Component } from 'react';
import { updateAccount } from '../actions/accounts';
import { connect } from 'react-redux';
import { Button, Form, Grid, Input } from 'semantic-ui-react';

export class AccountDetails extends Component {
  state = {
    name: this.props.user.name, phone: this.props.user.phone,
    email: this.props.user.email, password: '', company_name: this.props.user.company_name,
    communication_preferences: {}
  };

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, password, email, company_name } = this.state;
    this.props.dispatch(updateAccount(name, phone, password, email, company_name))
  }

  render () {
    const { name, phone, email, company_name, password } = this.state;

    return (
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Input
              id="name"
              value={name}
              onChange={this.handleChange}
              required
              placeholder='Name'
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="email"
              value={email}
              onChange={this.handleChange}
              required
              placeholder='Email'
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="company_name"
              value={company_name}
              onChange={this.handleChange}
              required
              placeholder='Company Name'
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="phone"
              value={phone}
              onChange={this.handleChange}
              required
              placeholder='Phone'
            />
          </Form.Field>
          <Form.Field>
            <Input
              type='password'
              id="password"
              value={password}
              onChange={this.handleChange}
              required
              placeholder='Current Password'
            />
            </Form.Field>
          <Button color='grey' type='submit'>Update Profile</Button>
        </Form>
      </Grid.Column>
    )
  }
}




const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(AccountDetails);
