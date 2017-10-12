import React from 'react';
import { connect } from 'react-redux';
import { Message, Header, Segment } from 'semantic-ui-react';
import { clearFlash } from '../actions/flash';

const fadeFlash = dispatch => {
  setTimeout(() => {
    dispatch(clearFlash());
  }, 15000);
};

const Flash = ({ flash, dispatch }) => {
  if (flash.message)
    return (
      <Segment basic style={{ margin: '0', padding: '0' }} onClick={() => dispatch(clearFlash())}>
        <Message style={{ textAlign: 'center' }} header={flash.message} color={flash.color}>
          { fadeFlash(dispatch) }
        </Message>
      </Segment>
    );
  return null;
};

const mapStateToProps = state => {
  return { flash: state.flash };
};

export default connect(mapStateToProps)(Flash);
