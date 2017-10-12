import React, { Component } from 'react';
import noProjectsPlaceholder from '../images/no-projects-placeholder.jpg';
import { Segment, Image, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchClients } from '../actions/clients';
import ProjectModal from './ProjectModal';

class Portfolio extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }

  render() {
    return(
      <Segment basic style={{ marginTop: '10px' }}>
        <ProjectModal />
        <Divider hidden />
        { this.props.projects.length ?
          <Segment>Show Projects Here</Segment> :
          <Image size='medium' src={noProjectsPlaceholder} alt='No Projects Placeholder Image' />
        }
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { projects: state.projects }
}

export default connect(mapStateToProps)(Portfolio);
