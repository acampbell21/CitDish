import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Segment, Label, Form, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchClients, singleClient } from '../actions/clients';

const styles = {
  segment:{
    margin: '15%',
  },
  grid: {
    //width: '80%',
    justifyContent: 'center',
    alignItems: 'center',

  },
}

class Client extends Component {
  state = { clients: [] }
  componentDidMount() {
    //this.props.dispatch(singleClient())
    // this.props.match.params.id
    // axios.get('/api/client/',  )
    //   //if( this.props.match.params.id )
    //   .then( res => this.setState({ client: res.data }) )
    // // axios call to the clients controller show action
    // // set state of the client which will give you all the data
    // // make it look good
    // console.log(this.state.client)
  }

  render() {

    const { clients, id } = this.props;
    return(
      <Segment.Group style={styles.segment}>
        <Segment>
          <Grid columns='equal' style={styles.grid}>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label attached='left'>Name: </Label>
                  
                    {this.props.name}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Label attached='left'>Title: </Label>
                    {this.props.title}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label attached='left'>Phone: </Label>
                    {this.props.phone}
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment>
                  <Label attached='left'>Mobile Phone: </Label>
                    {this.props.mobile_phone}
                  </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label attached='left'>Address: </Label>
                    {this.props.mailing_address}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Label attached='left'>Email: </Label>
                    {this.props.email}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <Form>
            <TextArea autoHeight placeholder='Notes' />
              {this.props.notes}
          </Form>
        </Segment>
      </Segment.Group>
    )
  }
}

const mapStateToProps = (state) => {
  return { clients: state.clients };
}

export default connect(mapStateToProps)(Client);
