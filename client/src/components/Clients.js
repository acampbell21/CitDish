import React, { Component } from 'react';
import axios from 'axios';
import { Card,
  Image,
  Button,
  Icon,
  Table,
  Menu,
  Segment,
  Container,
  Search,
  Header,
  Divider,
  Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchClients, singleClient } from '../actions/clients';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import _ from 'lodash'

const styles = {
  group: {
    margin: '5%',
  },
  input: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  table: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: '0%',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}


class Clients extends Component {
  state = { clients: [], isLoading: false, results: [], value: '' }

  componentWillMount() {
    // this.props.dispatch(fetchClients())
   }

   handleDelete = (id) => {
     const { dispatch } = this.props;
     axios.delete(`/api/clients/${id}`)
     .then(res => {
       this.setState({ clients: res.data })
       dispatch(setHeaders(res.headers))
     })
     .catch(res => {
       dispatch(setFlash('Error deleting the client', 'red'))
       dispatch(setHeaders(res.headers))
     })
   }

   componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })


    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.clients, isMatch),
      })
    },
  )};

  fetchClient = (id, history) => {
    history.push(`/clients/${id}`)
    this.props.dispatch(singleClient(id))

  }

  // //  search = (e, data) => {
  // //    const clientSearch = this.props.clients.filter(e) => {
  // //      if(clients.id === c.id)
  // //        return clients
  // //    });
  // //    this.setState({ [id]: value });
  //
  //    // search is going to happen on change of the search input
  //    // do a filter through this.props.clients filter on the name for now
  //  }

  render() {
    const { clients, id, history } = this.props;
    const { isLoading, value, results } = this.state
    return(
      <Segment.Group style={styles.group}>
        <Segment style={styles.input}>
          <Search
            placeholder='Search'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
          <Button
            primary
            content='Add Client'
            icon='add user'
            labelPosition='left'
          />
        </Segment>
        <Segment.Group style={styles.table}>

          <Table celled striped compact sortable columns={6}>
             <Table.Header>
               <Table.Row>
                 <Table.HeaderCell>Name</Table.HeaderCell>
                 <Table.HeaderCell>Title</Table.HeaderCell>
                 <Table.HeaderCell>Address</Table.HeaderCell>
                 <Table.HeaderCell>Phone</Table.HeaderCell>
                 <Table.HeaderCell>Email</Table.HeaderCell>
                 <Table.HeaderCell>Action</Table.HeaderCell>
               </Table.Row>
             </Table.Header>

             <Table.Body>
               { clients.map( client =>
                   <Table.Row key={client.id}>
                    <Table.Cell>
                       <Button
                         onClick={() => this.fetchClient(client.id, history)}
                         basic
                         size='small'
                         color='blue'
                         fluid
                      >
                         {client.name}
                       </Button>
                    </Table.Cell>
                    <Table.Cell>{client.title}</Table.Cell>
                    <Table.Cell>{client.address}</Table.Cell>
                    <Table.Cell>{client.phone}</Table.Cell>
                    <Table.Cell>{client.email}</Table.Cell>
                    <Table.Cell>
                       <Icon
                         button
                         onClick //TODO send to edit page?
                         name='edit'
                         color='green' />
                       <Icon
                         button
                         onClick={() => this.handleDelete(id)}
                         name='user delete'
                         color='red' />
                    </Table.Cell>
                   </Table.Row>

                 )
               }
             </Table.Body>

          </Table>
        </Segment.Group>
      </Segment.Group>
    )
  }
}

const mapStateToProps = (state) => {
  return { clients: state.clients };
}

export default connect(mapStateToProps)(Clients);
