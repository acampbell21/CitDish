import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUpload, uploadCompanyImage } from '../actions/accounts';
import { Grid, Image, Segment, Icon, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import MissingAvatar from '../images/missing-avatar.png';
import MissingCompany from '../images/missing-company.png';

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
    const { image } = this.props.user;
    const userImage = image ? image : MissingAvatar;

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
          <Image src={userImage} size='small' shape='circular' />
        </Dropzone>
      )
    }
  }

  uploadCompanyDisplay = () => {
    const { company_image } = this.props.user;
    const companyImage = company_image ? company_image : MissingCompany;

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
          <Image src={companyImage} size='small' shape='rounded' />
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
