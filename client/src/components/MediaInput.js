import React from 'react';
import { Segment, Header, Image, Divider, Grid } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import pdfIcon from '../images/pdf-icon.png';

const styles = {
  truncate: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  pdfIcon: {
    width: '150px',
    height: '150px',
  },
  column: {
    marginBottom: '10px',
    textAlign: 'center',
  },
}

const displayPreviews = (images) => {
  return images.map( image => {
    const { type, url, name } = image;

    if(type === 'pdf')
      return(
        <Grid.Column width={8} style={styles.column}>
          <Image centered style={styles.pdfIcon} src={pdfIcon} alt='PDF Icon' />
          <Divider hidden />
          <Segment style={styles.truncate}>
            <strong>{name}</strong>
            <Divider hidden />
            <strong>Pages: {image.pages}</strong>
          </Segment>
        </Grid.Column>
      );
    else
      return(
        <Grid.Column width={8} style={styles.column}>
          <Image centered src={url} alt='Project Image Preview' />
          <Divider hidden />
          <Segment style={styles.truncate}>
            <strong>{name}</strong>
            <Divider hidden />
            <strong>Type: {type}</strong>
          </Segment>
        </Grid.Column>
      );
  });
}

const MediaInput = ({ addMediaInput, updateMediaFile, removeMediaInput, index, files }) => (
  <Segment basic>
    <Dropzone accept='application/pdf, image/jpg, image/png, image/jpeg' onDrop={(acceptedFiles, rejectedFiles) => updateMediaFile(acceptedFiles, rejectedFiles)} style={{ height: '50px', border: '1px dashed black'}}>
      <Header textAlign='center'>Drop Files Here Or Click</Header>
    </Dropzone>
    <Divider horizontal>Uploaded Media</Divider>
    <Grid centered padded>
      <Grid.Row>
        { displayPreviews(files) }
      </Grid.Row>
    </Grid>
  </Segment>
)

export default MediaInput;
