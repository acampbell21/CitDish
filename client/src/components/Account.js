import React, { Component } from 'react';
import { updateAccount } from '../actions/accounts';
import { connect } from 'react-redux';
import { handleUpload, uploadCompanyImage } from '../actions/accounts';
import { Button, Form, Grid, Image, Dimmer, Input, Loader } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

class Account extends Component {
  state = {
    name: this.props.user.name, phone: this.props.user.phone,
    email: this.props.user.email, password: '', company_name: this.props.user.company_name,
    communication_preferences: {}, image: this.props.user.image,
    company_image: this.props.user.company_image, fileUploading: false,
    companyUploading: false,
  };

  toggleUploading = () => {
    this.setState({ fileUploading: !this.state.fileUploading });
  }

  toggleCompanyUploading = () => {
    this.setState({ companyUploading: !this.state.companyUploading });
  }

  onProfileDrop = (image) => {
    this.toggleUploading();
    this.props.dispatch(handleUpload(image[0], this.toggleUploading));
  }

  onCompanyDrop = (company_image) => {
    this.toggleCompanyUploading();
    this.props.dispatch(uploadCompanyImage(company_image[0], this.toggleCompanyUploading));
  }

  uploadDisplay = () => {
    if(this.state.fileUploading) {
      return(
        <Dimmer active inverted>
          <Loader>Please Wait...</Loader>
        </Dimmer>
      );
    } else {
      return(
        <Dropzone onDrop={this.onProfileDrop} style={{border: 'none'}}>
          <Image src={this.props.user.image} size='small' shape='circular' />
        </Dropzone>
      )
    }
  }

  uploadCompanyDisplay = () => {
    if(this.state.companyUploading) {
      return(
        <Dimmer active inverted>
          <Loader>Please Wait...</Loader>
        </Dimmer>
      );
    } else {
      return(
        <Dropzone
          onDrop={this.onCompanyDrop}
          style={{border: 'none'}}>
          <Image src={this.props.user.company_image} size='small' shape='rounded' />
        </Dropzone>
      )
    }
  }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, password, email, company_name } = this.state;
    this.props.dispatch(updateAccount(name, phone, password, email, company_name))
  }

  render() {
    const { name, phone, email, company_name, password } = this.state;

    return (
      <Grid verticalAlign='middle' columns={12} padded="vertically" style={{ paddingTop: '100px' }}>
        <Grid.Row>
          <Grid.Column width={4} style={{ margin: '0 auto' }}>
            { this.uploadDisplay() }
            { this.uploadCompanyDisplay() }
          </Grid.Column>
          <Grid.Column width={4}>
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
          <Grid.Column width={4} style={{ margin: '0 auto' }}>
            <Button circular color="linkedin" icon="linkedin" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Account);
