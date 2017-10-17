import React, { Component } from 'react';
import noProjectsPlaceholder from '../images/no-projects-placeholder.jpg';
import { Segment, Image, Divider, Responsive, Card, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchClients } from '../actions/clients';
import { fetchProjects } from '../actions/projects';
import ProjectModal from './ProjectModal';

class Portfolio extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
    this.props.dispatch(fetchClients());
  }

  displayProjects = () => {
    return this.props.projects.map(project => {
      return(
        <Card raised>
          <Image centered style={{ width: '200px', height: '200px' }} src={project.pages[0].media_url} />
          <Card.Content>
            <Card.Header>{project.title}</Card.Header>
            <Segment basic textAlign='center'>
            </Segment>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='users' />
              {project.sent_to}
            </a>
            <Divider hidden />
            <a>
              <Icon name='copy' />
              Number Of Pages: {project.pages.length}
            </a>
          </Card.Content>
        </Card>
      );
    })
  }

  projectIcons() {
    return [
      <Icon name='eye' circular size='large' style={{ backgroundColor: 'rgb(0, 145, 210)', color: 'white' }} />,
      <Icon name='mail' circular size='large' style={{ backgroundColor: 'rgb(0, 145, 210)', color: 'white' }} />,
      <Icon name='share' circular size='large' style={{ backgroundColor: 'rgb(0, 145, 210)', color: 'white' }} />,
      <Icon name='mobile' circular size='large' style={{ backgroundColor: 'rgb(0, 145, 210)', color: 'white' }} />,
      <Icon name='line chart' circular size='large' style={{ backgroundColor: 'rgb(0, 145, 210)', color: 'white' }} />,
      <Icon name='copy' circular size='large' style={{ backgroundColor: 'rgb(0, 145, 210)', color: 'white' }} />,
    ]
  }

  render() {
    return(
      <Segment basic style={{ height: '100vh', overflowY: 'scroll', overflowX: 'hidden', padding: '0 10px 10px 10px' }}>
        <Segment
          basic
          textAlign='center'
          style={{ width: '30%', margin: '0 auto', borderRadius: '0 0 10px 10px', height: 'auto', borderLeft: '3px solid rgb(0, 145, 210)', borderRight: '3px solid rgb(0, 145, 210)', borderBottom: '3px solid rgb(0, 145, 210)'}}
        >
          { this.projectIcons() }
        </Segment>
        <ProjectModal />
        <Divider hidden />
        { this.props.projects.length ?
          <Card.Group stackable itemsPerRow={3}>
            { this.displayProjects() }
          </Card.Group> :
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
