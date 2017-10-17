/*eslint no-restricted-globals: ["warn", "event", "fdescribe"]*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Image, Segment, Divider } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { setOauth, disconnectSocialOAuth, setLinkedInProfilePic, disconnectCrmOAuth } from '../actions/oauth';
import SocialLoginButton from './SocialLoginButton';
import LinkedInLogo from '../images/linkedin-round-logo.png';
import SalesforceLogo from '../images/salesforce-logo.png';
import SalesforceOAuth from './SalesforceOAuth';

export class AccountIntegrations extends Component {
  handleSocialLoginFailure = () => {
    this.props.dispatch(setFlash('You did not authorize the app. Try again!', 'red'));
    window.location.reload();
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
    const { user: { social_oauth, crm_oauth }, dispatch } = this.props;

    return (
      <Grid.Column mobile={16} tablet={8} computer={4} style={{ margin: '0 auto' }}>
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
              onLoginSuccess={(response) => dispatch(setOauth(response))}
              onLoginFailure={this.handleSocialLoginFailure}
            >
              <Button>Login To LinkedIn</Button>
            </SocialLoginButton>
          }
          </Segment>
      </Grid.Column>
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

export default connect(mapStateToProps)(AccountIntegrations);
