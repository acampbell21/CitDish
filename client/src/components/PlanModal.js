import React, { Component } from 'react';
import PaymentPlanModal from './PaymentPlanModal';
import Payment from './Payment';
import { Grid, 
         Header, 
         Modal, 
         Button, 
         Segment, 
         Icon, 
        } from 'semantic-ui-react';

const styles = {
  modalBackground: {
    backgroundColor: 'white',
  },
  modalText: {
    color: 'black',
    fontSize: '16px',
    margin: '0 auto',
  },
   modalTopText: {
    color: 'black',
    fontSize: '16px',
    top: '20px',
  },
  modalGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalColumn: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    outlineColor: 'black',
    outlineStyle: 'solid',
    outlineWidth: '2px',
    height: '800px',
  },
  modalPlan: {
    color: 'black',
    bottom: '40px',
    textTransform: 'uppercase',
  },
  modalButton: {
    display: 'flex',
    alignItems: 'baseline',
    bottom: '10px',
    position: 'absolute',
  },
  modalPricing: {
    fontSize: '25px',
    color: '#2EB7FF',
    textTransform: 'uppercase',
  },
  modalPerMonth: {
    color: 'black',
    top: '30px',
  },
  modalPerMonthMiddle: {
    color: 'black',
    top: '15px',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  modalHeader: {
    color: 'black',
    fontSize: '20px',
  },
}         

class PlanModal extends Component {
  render() {
    return (
      <Modal  
        trigger={<Button color='blue' size='big'>Current Plan</Button>}
        closeIcon
        basic color='blue' 
        size='huge'
        style={styles.modalBackground}
      >
        <Modal.Header 
          style={styles.modalHeader}
        >
          Select a plan
        </Modal.Header>
          <Modal.Content>
          <Grid 
            verticalAlign='middle' 
            padded='vertically' 
            columns={12} 
            style={styles.modalGrid}>
            <Grid.Row>
              <Grid.Column 
                style={styles.modalColumn} 
                mobile={16} tablet={8} computer={4} 
                textAlign='center' 
                icon='user'>
                <Header icon as='h2' style={styles.upperCase}>
                  <Icon name='user' />
                  SINGLE
                </Header>
                <Segment basic style={styles.modalText}>
                  Feature 1
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 2
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 3
                </Segment>
                <Segment basic style={styles.modalText}> 
                  Feature 4
                </Segment>
                <Segment basic style={styles.modalPricing}> 
                  $50                         
                </Segment> 
                <Segment basic style={styles.modalPerMonth}>
                  Per Month
                </Segment>
                <Segment style={styles.modalPlan} basic>
                  (1 SEAT X $50)
                </Segment>
                  <Button 
                    style={styles.modalButton} 
                    color='blue' 
                    size='large'
                  >
                    Stay in Single
                  </Button>
              </Grid.Column>
              <Grid.Column 
                style={styles.modalColumn} 
                mobile={16} tablet={8} computer={4} 
                textAlign='center'
              >
                <Header icon as='h2' style={styles.upperCase}>
                  <Icon name='users' />
                  TEAM
                </Header>
                <Segment basic style={styles.modalText}>
                  Feature 1
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 2
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 3
                </Segment>
                <Segment basic style={styles.modalText}> 
                  Feature 4
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 5
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 6
                </Segment>
                <Segment basic style={styles.modalPricing}> 
                  $50                         
                </Segment>      
                <Segment basic style={styles.modalPerMonthMiddle}>
                  PER MONTH
                </Segment>
                <Segment style={styles.modalPlan} basic>
                  (10 SEAT X $40 PER SEAR)
                </Segment>
                <Button 
                  style={styles.modalButton} 
                  color='blue' 
                  size='large'
                >
                  Switch to Team
                </Button>
              </Grid.Column>
              <Grid.Column 
                style={styles.modalColumn} 
                mobile={16} tablet={8} computer={4} 
                textAlign='center'
              >
                <Header icon as='h1' style={styles.upperCase}>
                  <Icon name='building outline' />
                  ENTERPRISE
                </Header>
                <Segment basic style={styles.modalText}>
                  Feature 1
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 2
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 3
                </Segment>
                <Segment basic style={styles.modalText}> 
                  Feature 4
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 5
                </Segment>
                <Segment basic style={styles.modalText}>
                  Feature 6
                </Segment>                                                                                                                                                          
                <Segment basic style={styles.modalPricing}>
                  CONTACT US
                </Segment>
                <Segment basic style={styles.modalPlan}>
                  (OVER 10 SEATS)
                </Segment>
                <Button 
                  style={styles.modalButton} 
                  color='blue' 
                  size='large'
                >
                  Request Quote
                </Button>
              </Grid.Column> 
            </Grid.Row>
          </Grid> 
        </Modal.Content>
      </Modal>
    )
  }
}

export default PlanModal;