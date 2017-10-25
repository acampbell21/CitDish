import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import ReactWebCamCapture from 'react-webcam-capture';

class Recorder extends Component {
  state = {
  	granted: false,
  	rejectedReason: '',
  	recording: false,
  	paused: false
	}

  handleGranted = () => {
    this.setState({ granted: true });
    console.log('Permission Granted!');
  }

  handleDenied = (err) => {
    this.setState({ rejectedReason: err.name });
    console.log('Permission Denied!', err);
  }

  handleStart = (stream) => {
    this.setState({
      recording: true
    });

    this.setStreamToVideo(stream);
    console.log('Recording Started.');
  }

  handleStop = (blob) => {
    this.setState({
      recording: false
    });

    this.releaseStreamFromVideo();

    console.log('Recording Stopped.');
    this.downloadVideo(blob);
  }

  handlePause = () => {
    this.releaseStreamFromVideo();

    this.setState({
      paused: true
    });
  }

  handleResume = (stream) => {
    this.setStreamToVideo(stream);

    this.setState({
      paused: false
    });
  }

  handleError = (err) => {
    console.log(err);
  }

  setStreamToVideo = (stream) => {
    let video = this.refs.app.querySelector('video');

    if(window.URL) {
      video.src = window.URL.createObjectURL(stream);
    }
    else {
      video.src = stream;
    }
  }

  releaseStreamFromVideo = () => {
    this.refs.app.querySelector('video').src = '';
  }

  downloadVideo = (blob) => {
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);

    a.click();
  }

  render() {
    const { granted, rejectedReason, recording, paused } = this.state;

    return(
      <div ref='app'>
        Recorder
        <ReactWebCamCapture
          constraints={{ audio: true, video: true }}
          timeSlice={10}
          onGranted={this.handleGranted}
          onDenied={this.handleDenied}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onPause={this.handlePause}
          onResume={this.handleResume}
          onError={this.handleError}
          render={({ start, stop, pause, resume }) =>
          <div>
            <p>Granted: {granted.toString()}</p>
            <p>Rejected Reason: {rejectedReason}</p>
            <p>Recording: {recording.toString()}</p>
            <p>Paused: {paused.toString()}</p>

            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>

            <p>Streaming test</p>
            <video autoPlay></video>
          </div>
        } />
      </div>
    );
  }
}

export default Recorder;
