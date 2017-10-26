import React, { Component } from 'react';
import noProjectsPlaceholder from '../images/no-projects-placeholder.jpg';
import { Segment, Image, Divider, Responsive, Card, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchClients } from '../actions/clients';
import { fetchProjects, deleteProject } from '../actions/projects';
import ProjectModal from './ProjectModal';
import EditProjectModal from './EditProjectModal';

class Portfolio extends Component {
  state = { project: null };

  componentDidMount() {
    this.props.dispatch(fetchProjects());
    this.props.dispatch(fetchClients());
  }

  projectDestroy = (project) => {
    this.props.dispatch(deleteProject(project))
    this.setState({ project: null })
  }

  unselectProject = (project) => {
    this.setState({ project: null })
  }


  displayProjects = () => {
    return this.props.projects.map(project => {
      let projectStyle = {};
      
      if(project.id === this.state)
        projectStyle = { border: '1px solid rgb(0, 145, 210)'}
        
      return(
        <Card style={{ ...projectStyle }} raised onClick={() => this.setState({ project: project.id })}>
          <Image centered style={styles.projectImage} src={project.pages[0].media_url} />
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

  renderModal = (projectId) => {
    return <EditProjectModal projectId={projectId} />
  }

  projectButtons(project) {
    return [
      <Button icon='eye' circular size='medium' style={styles.topButtons} />,
      <Button icon='mail' circular size='medium' style={styles.topButtons} />,
      <Button icon='share' circular size='medium' style={styles.topButtons} />,
      <Button icon='mobile' circular size='medium' style={styles.topButtons} />,
      <Button icon='line chart' circular size='medium' style={styles.topButtons} />,
      <Button icon='copy' circular size='medium' style={styles.topButtons} />,
      <Button icon='trash' onClick={() => this.projectDestroy(project)} circular size='medium' style={styles.topButtons} />,
      <Button icon='hide' onClick={() => this.unselectProject(project)} circular size='medium' style={styles.topButtons} />,
      <EditProjectModal project={project} />
    ]
  }

  render() {
    const { project } = this.state;
    
    return(
      <Segment basic style={styles.segmentOne}>
        { project &&
          <Segment
            basic
            textAlign='center'
            style={styles.segmentTwo}
          >
             { this.projectButtons(project) } 
          </Segment>
        }
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
  topButtons: {
    backgroundColor: 'rgb(0, 145, 210)',
    color: 'white'
  },
  projectImage: {
    width: '200px',
    height: '200px',
  },
  segmentOne: {
    height: '100vh', 
    overflowY: 'scroll', 
    overflowX: 'hidden', 
    padding: '0 10px 10px 10px',
  },
  segmentTwo: {
    width: '30%', 
    margin: '0 auto', 
    borderRadius: '0 0 10px 10px', 
    height: 'auto', 
    borderLeft: '3px solid rgb(0, 145, 210)', 
    borderRight: '3px solid rgb(0, 145, 210)', 
    borderBottom: '3px solid rgb(0, 145, 210)',
  }

}

const mapStateToProps = (state) => {
  return { projects: state.projects }
}

export default connect(mapStateToProps)(Portfolio);
