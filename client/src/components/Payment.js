import React, { Component } from 'react';
import PaymentPlanModal from './PaymentPlanModal';
import PlanModal from './PlanModal';
import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Modal,
  Button,
  Segment,
  Icon,
  Checkbox,
  Divider,
  Container
} from 'semantic-ui-react'

const styles = {
  blueBoldText: {
    color: '#2EB7FF',
    fontWeight: 'bold',
    fontSize: '34px',
    textTransform: 'uppercase',
  },
  planGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  margin: {
    margin: '0 auto',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
}

class Payment extends Component {
  state = { active: true };

  render() {
    const { active } = this.state;

    return(
      <div>
        <Grid
          verticalAlign='middle'
          textAlign='center'
          columns={12}
          padded="vertically">
          <Grid.Row>
            <Grid.Column
              mobile={16} tablet={8} computer={4}
              style={styles.margin}
            >
              <Header as='h2' style={styles.upperCase}>USERS</Header>
              <Segment style={styles.blueBoldText} basic>1</Segment>

              <Button
                as={Link}
                to='/team'
                basic color='blue'
                size='huge'
              >
               Manage Users
             </Button>
            </Grid.Column>
            <Grid.Column
              mobile={16} tablet={8} computer={4}
              style={styles.margin}
            >
              <Header as='h2' style={styles.upperCase}>MONTHLY PAYMENT</Header>
              <Segment style={styles.blueBoldText} basic>
                $50
              </Segment>
              <Button
                as={Link}
                to='/team'
                basic color='blue'
                size='huge'
              >
               Add Users
             </Button>
            </Grid.Column>
            <Grid.Column
              mobile={16} tablet={8} computer={4}
              style={styles.margin}
            >
              <Header as='h2' style={styles.upperCase}>CURRENT PLAN</Header>
              <Segment style={styles.blueBoldText} basic>
                single
              </Segment>
              <PlanModal />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <PaymentPlanModal />
      </div>
    )
  }
}

export default Payment;
