import React, { Component } from 'react';
import {
  Header,
  Segment,
  Form,
  Button,
  Image,
  Grid,
  Input,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { Link } from 'react-router-dom';
import cdLogo from '../images/cd-logo.png';
import bgPattern from '../images/bg-pattern.jpg'

const styles = {
  grid: {
    background: `url(${bgPattern}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100%',
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
  registerBox: {
    border: '1px solid black',
    padding: '0',
    backgroundColor: 'white',
  },
}

class Register extends Component {
  state = { name: '', phone: '',  email: '', password: '', passwordConfirmation: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { name, phone, email, password, passwordConfirmation } = this.state;
    dispatch(registerUser(name, phone, email, password, passwordConfirmation, history));
  }

  render() {
    const { name, phone, email, password, passwordConfirmation } = this.state;
    return (
      <Grid style={styles.grid}>
        <Segment basic style={styles.registerBox}>
          <div style={styles.row}>
            <Grid.Row>
              <div style={styles.logo}>
                <Image
                  size='small'
                  floated='left'
                  fluid src={cdLogo}
                  alt='CitizenDish Logo'
                />
                <Header
                  className='header'
                  as='h1'
                  floated='right'> Sign Up for CitizenDish
                </Header>
              </div>
            </Grid.Row>
          </div>
          <div style={styles.dualBox}>
            {/* <Grid.Column>
              <Header
                paddingTop='10px'
                color='grey'
                as='h3'> Sign Up with your social accounts:
              </Header>
              <div style={styles.buttons}>
                <Button circular color='google plus'>
                  <Icon name='google plus' /> Sign Up With Google Plus
                </Button>
                <br/>
                <Button circular color='facebook'>
                  <Icon name='facebook' /> Sign Up With Facebook
                </Button>
                <br/>
                <Button circular color='linkedin'>
                  <Icon name='linkedin' /> Sign Up With LinkedIn
                </Button>
              </div>
              <Header textAlign='center' color='blue' as='h5'>
                <Link to='/Login'>Existing users, Log in</Link>
              </Header>
            </Grid.Column> */}
            <Grid.Column>
              <Header
                paddingTop='10px'
                color='grey'
                as='h3'> Please complete to Sign Up:
              </Header>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <Input
                      required
                      id='name'
                      value={name}
                      placeholder='Your Name'
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Input
                      required
                      id='phone'
                      value={phone}
                      placeholder='Your Phone Number'
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Input
                      required
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

                  <Form.Field>
                    <Input
                      required
                      id='passwordConfirmation'
                      value={passwordConfirmation}
                      placeholder='Confirm Your Password'
                      type='passwordConfirmation'
                      onChange={this.handleChange}
                    />
                  </Form.Field>


                  <Segment style={styles.submit} basic>

                      <Link
                        to='/Login'
                        // textAlign='center'
                        floated='left'
                        color='blue'
                        as='h5'>Existing User Log in</Link>

                      <Button
                        size='big'
                        circular
                        floated='right'
                        primary
                        type='submit'> Done
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

export default connect()(Register);
