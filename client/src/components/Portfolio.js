import React, { Component } from 'react';
import noProjectsPlaceholder from '../images/no-projects-placeholder.jpg';
import { Segment, Image, Divider, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchClients } from '../actions/clients';
import ProjectModal from './ProjectModal';

class Portfolio extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }

  render() {
    return(
      <Segment basic>
        <ProjectModal />
        <Divider hidden />
        { this.props.projects.length ?
          <Segment>Show Projects Here</Segment> :
          <Segment basic style={styles.noPad}>
            <Responsive as={Segment} basic style={styles.noPad} minWidth={992}>
              <Image size='medium' src={noProjectsPlaceholder} alt='No Projects Placeholder Image' />
            </Responsive>
            <Responsive as={Segment} basic style={styles.noPad} maxWidth={992}>
              <Image centered size='medium' src={noProjectsPlaceholder} alt='No Projects Placeholder Image' />
            </Responsive>
          </Segment>
        }
      </Segment>
    );
  }
}

const styles = {
  noPad: {
    padding: '0',
  },
}

const mapStateToProps = (state) => {
  return { projects: state.projects }
}

export default connect(mapStateToProps)(Portfolio);
