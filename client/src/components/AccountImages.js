import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUpload, uploadCompanyImage } from '../actions/accounts';
import { Grid, Image, Segment, Icon, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

export class AccountImages extends Component {
  state = { company_image: '', image: '', fileUploading: false, companyUploading: false }

  toggleUploading = () => {
    this.setState({ fileUploading: !this.state.fileUploading });
  }

  toggleCompanyUploading = () => {
    this.setState({ companyUploading: !this.state.companyUploading });
  }

  onProfileDrop = (image) => {
    this.toggleUploading();
    this.props.dispatch(handleUpload(image[0], this.toggleUploading));
  }

  onCompanyDrop = (company_image) => {
    this.toggleCompanyUploading();
    this.props.dispatch(uploadCompanyImage(company_image[0], this.toggleCompanyUploading));
  }

  uploadDisplay = () => {
    if(this.state.fileUploading) {
      return(
        <Segment basic>
          <Icon name='spinner' loading size='huge' />
          <Header as='h3'>User Image Uploading Please Wait...</Header>
        </Segment>
      );
    } else {
      return(
        <Dropzone onDrop={this.onProfileDrop} style={{border: 'none'}}>
          <Image src={this.props.user.image} size='small' shape='circular' />
        </Dropzone>
      )
    }
  }

  uploadCompanyDisplay = () => {
    if(this.state.companyUploading) {
      return(
        <Segment basic>
          <Icon name='spinner' loading size='huge' />
          <Header as='h3'>Company Image Uploading Please Wait...</Header>
        </Segment>
      );
    } else {
      return(
        <Dropzone
          onDrop={this.onCompanyDrop}
          style={{border: 'none'}}>
          <Image src={this.props.user.company_image} size='small' shape='rounded' />
        </Dropzone>
      )
    }
  }

  render() {
    return (
      <Grid.Column mobile={16} tablet={8} computer={4} style={{ margin: '0 auto' }}>
        { this.uploadDisplay() }
        { this.uploadCompanyDisplay() }
      </Grid.Column>
    )
  }

}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(AccountImages);