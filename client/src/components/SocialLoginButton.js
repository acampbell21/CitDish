import React from 'react';
import SocialLogin from 'react-social-login';
import { Segment } from 'semantic-ui-react';

const SocialLoginButton = ({ children, triggerLogin, ...props }) => (
  <Segment basic onClick={triggerLogin} {...props}>
    { children }
  </Segment>
)
 
export default SocialLogin(SocialLoginButton);