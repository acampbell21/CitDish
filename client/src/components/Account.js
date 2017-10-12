/*eslint no-restricted-globals: ["warn", "event", "fdescribe"]*/
import React, { Component } from 'react';
import { updateAccount } from '../actions/accounts';
import { connect } from 'react-redux';
import { handleUpload, uploadCompanyImage } from '../actions/accounts';
import { Button, Form, Grid, Image, Input, Segment, Icon, Header, Divider } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { setOauth, disconnectSocialOAuth, setLinkedInProfilePic, disconnectCrmOAuth } from '../actions/oauth';
import Dropzone from 'react-dropzone';
import SocialLoginButton from './SocialLoginButton';
import LinkedInLogo from '../images/linkedin-round-logo.png';
import SalesforceLogo from '../images/salesforce-logo.png';
import SalesforceOAuth from './SalesforceOAuth';

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
        <Segment basic>
          <Icon name='spinner' loading size='huge' />
          <Header as='h3'>User Image Uploading Please Wait...</Header>
        </Segment>
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
        <Segment basic>
          <Icon name='spinner' loading size='huge' />
          <Header as='h3'>Company Image Uploading Please Wait...</Header>
        </Segment>
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

  handleSocialLogin = (payload) => {
    this.props.dispatch(setOauth(payload));
  }

  handleSocialLoginFailure = () => {
    this.props.dispatch(setFlash('You did not authorize the app. Try again!', 'red'));
  }

  disconnectSocialOauth = () => {
    if(confirm('Really Disconnect LinkedIn?'))
      this.props.dispatch(disconnectSocialOAuth());
  }

  disconnectCrmOauth = () => {
    if(confirm('Really Disconnect Salesforce?'))
      this.props.dispatch(disconnectCrmOAuth());
  }

  setLinkedInProfilePic = () => {
    this.props.dispatch(setLinkedInProfilePic());
  }

  render() {
    const { name, phone, email, company_name, password } = this.state;
    const { social_oauth, crm_oauth } = this.props.user;

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
            <Segment basic textAlign='center'>
              <Image src={SalesforceLogo} centered style={styles.salesforceLogo} alt='Salesforce Logo' />
              { crm_oauth ?
                <Segment basic>
                  <Button 
                    color='red' 
                    onClick={this.disconnectCrmOauth}
                    style={{ marginTop: '10px' }}
                  >
                    Disconnect Salesforce
                  </Button> 
                </Segment> :
                <SalesforceOAuth />
              }
            </Segment>
            <Segment basic textAlign='center'>
              <Image src={LinkedInLogo} centered style={styles.linkedInLogo} alt='LinkedIn Logo' />
              { social_oauth ?
                <Segment basic>
                  <Button 
                    color='red' 
                    onClick={this.disconnectSocialOauth}
                    style={{ marginTop: '10px' }}
                  >
                    Disconnect LinkedIn
                  </Button> 
                  <Divider hidden />
                  <Button size='tiny' onClick={this.setLinkedInProfilePic}>Use LinkedIn Picture</Button>
                </Segment> :
                <SocialLoginButton
                  provider='linkedin'
                  appId='86evrw56wtl8u8'
                  onLoginSuccess={this.handleSocialLogin}
                  onLoginFailure={this.handleSocialLoginFailure}
                >
                  <Button>Login To LinkedIn</Button>
                </SocialLoginButton>
              }
              </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const styles = {
  salesforceLogo: {
    width: '100px',
    height: '80px',
  },
  linkedInLogo: {
    width: '80px',
    height: '80px',
  },
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Account);
