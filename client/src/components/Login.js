import React, { Component } from 'react';
import { Header, Segment, Form, Button, Grid, Image, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/auth';
import { Link } from 'react-router-dom';
import cdLogo from '../images/cd-logo.png';
import bgPattern from '../images/bg-pattern.jpg'

const styles = {
  grid: {
    height: '100%',
    background: `url(${bgPattern}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    padding: 0,
    margin: 0,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   },

   row: {
     alignItems: 'center',
     backgroundColor: 'lightgrey',
     width: '100%',
     height: '80px',
     display: 'flex',
     justifyContent: 'flex-start',
   },

   logo: {
     paddingLeft: '30px',
   },

  dualBox: {
    justifyContent: 'space-around',
    width: '100%',
    display: 'flex',
    paddingTop: '20px',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column'
  },

  submit: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  loginBox: {
    border: '1px solid black',
    padding: '0',
    backgroundColor: 'white'
  },
}

class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  }

  render() {
    const { email, password } = this.state;
    return (
      <Grid style={styles.grid}>
        <Segment basic style={styles.loginBox}>
          <div style={styles.row}>
            <Grid.Row>
              <div style={styles.logo}>
                <Image
                  size='small'
                  floated='left'
                  src={cdLogo}
                  alt='CitizenDish Logo'
                />
                <Header
                  className='header'
                  as='h1'
                  floated='right'> CitizenDish Login
                </Header>
              </div>
            </Grid.Row>
          </div>
          <div style={styles.dualBox}>

            <Grid.Column>
              <Header
                color='grey'
                as='h3'> Please enter your email and password:
              </Header>
                <Form onSubmit={this.handleSubmit}>

                  <Form.Field>
                    <Input
                      required
                      autofocus
                      id='email'
                      value={email}
                      placeholder='Your Email'
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Input
                      required
                      id='password'
                      value={password}
                      placeholder='Your Password'
                      type='password'
                      onChange={this.handleChange}
                    />
                  </Form.Field>


                  <Segment style={styles.submit} basic>

                      <Link
                        to='/Register'
                        // textAlign='center'
                        floated='left'
                        color='blue'
                        as='h4'>New User?
                      </Link>

                      <Button
                        size='big'
                        circular
                        floated='right'
                        primary
                        type='submit'> Login
                      </Button>

                  </Segment>
                </Form>
            </Grid.Column>
          </div>
        </Segment>
      </Grid>
    );
  }
}

export default connect()(Login);
