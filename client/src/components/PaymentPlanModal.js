import React, { Component } from 'react';
import Payment from './Payment';
import PlanModal from './PlanModal';
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
  paymentButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  paymentPlanSegment: {
    right: '20px',
  },
  paymentPlanButton: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkbox: {
    right: '20px',
  },
  segment: {
    left: '20px',
  }
}

class PaymentPlanModal extends Component {
  render() {
    return(
      <Modal
        trigger={
          <Segment basic textAlign='center'>
            <Button
              color='blue'
              style={{ borderRadius: '10px' }}
              size='big'>
              Start Paying Annually
            </Button>
          </Segment>
        }
        closeIcon={<Button floated='right' compact tiny>X</Button>}
      >
        <Modal.Header>Start Paying Annually</Modal.Header>
         <Modal.Content scrolling>
          <Modal.Description>
            <Header>
              Choose your Billing Frequency.
            </Header>
              <Grid padded columns={12}>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Segment>
                      <Grid.Column>
                      <Header as='h1'> Pay Monthly</Header>
                      <Segment textAlign='left' basic>
                        <Checkbox style={styles.checkbox} />
                        $50 per Month
                      </Segment>
                      <Segment style={styles.segment} basic>
                        1 seat x $50
                      </Segment>
                      </Grid.Column>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment>
                      <Header as='h1'>Pay Annually</Header>
                      <Segment textAlign='left' basic>
                      <Checkbox style={styles.checkbox} />
                        $500 per year
                      </Segment>
                      <Segment style={styles.segment} basic>
                        1 seat x $50 x 10 months, 2 months free
                      </Segment>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Segment basic>
                    Price is exclusive of any applicable sales taxes.
                    When applicable, VAT/GST or other taxes are added
                    to the services based on VAT/GST or other relevant
                    legislation of the country where the customer is located.
                  </Segment>
                </Grid.Row>
                <Divider />
                <Grid.Row style={styles.paymentPlanButton}>
                  <Button standard >Cancel</Button>
                  <Button primary >Change Plan</Button>
                </Grid.Row>
              </Grid>
          </Modal.Description>
         </Modal.Content>
      </Modal>
    )
  }
}

export default PaymentPlanModal;
