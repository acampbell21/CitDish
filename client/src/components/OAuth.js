import { Component } from 'react';

class OAuth extends Component {
  componentDidMount() {
    let event = new CustomEvent("oauthCallback", {"detail": window.location.href});
    window.opener.document.dispatchEvent(event);
    window.close();
  }

  render() {
    return null;
  }
}

export default OAuth;
