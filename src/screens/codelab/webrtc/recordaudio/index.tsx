import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MicIcon from '@material-ui/icons/Mic';
import SpeakerIcon from '@material-ui/icons/Speaker';
import CameraIcon from '@material-ui/icons/Videocam';
import UnknownDeviceIcon from '@material-ui/icons/DeviceUnknown';
import IconButton from '@material-ui/core/IconButton';
import RecordIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import PauseIcon from '@material-ui/icons/StopTwoTone';

let useStyles = makeStyles(() => {
  return {
    deviceTypeRow: {
      backgroundColor: '#666666',
    },
    deviceTypeCell: {
      color: '#ffffff',
    },
    headerRow: {
      backgroundColor: '#222222',
    },
    headerCell: {
      color: '#ffffff',
    },
    errorRow: {
      // background:
      //  'repeating-linear-gradient(45deg, rgb(251, 239, 239), rgb(251, 239, 239) 10px, #e06666 10px, #e06666 20px)',
      backgroundColor: '#e06666',
    },
  };
});

enum DEVICE_STATUS {
  PENDING = 'pending',
  ALLOWED = 'allowed',
  DISALLOWED = 'disallowed',
}

// MediaDeviceKind is a defined type, but define enum for clarity
enum MediaDeviceKind {
  CAMERA = 'videoinput',
  MICROPHONE = 'audioinput',
  SPEAKER = 'audiooutput',
}

const DeviceSelectionExample: React.FC<{}> = () => {
  let classes = useStyles();

  // Establish State
  // TODO: This could be a reducer, but I wanted to keep it separate for clarity
  let [isInitialized, setInitalized] = useState<boolean>(false);
  let [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [micStatus, setMicStatus] = useState<DEVICE_STATUS>(DEVICE_STATUS.PENDING);
  let [cameraStatus, setCameraStatus] = useState<DEVICE_STATUS>(DEVICE_STATUS.PENDING);

  let [recordingStatus, setRecordingStatus] = useState<boolean>(false);

  // Ref
  let audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  let micStreamRef = useRef<MediaStream | null>(null);

  const record = (micStream: MediaStream) => {
    setRecordingStatus(!recordingStatus);

    const context = new AudioContext();
    const source = context.createMediaStreamSource(micStream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function (e) {
      // Do something with the data, e.g. convert it to WAV
      console.log(e.inputBuffer);
    };

    // if (!recordingStatus) {
    //   audioPlayerRef.current!.srcObject = micStream;
    //   audioPlayerRef.current!.muted = true;
    // } else {
    //   audioPlayerRef.current!.muted = false;
    // }
  };

  const recordClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Request Access for Mic
    if (micStreamRef.current) {
      record(micStreamRef.current);
      return;
    }

    console.log(e);

    // Get User Media status for Mic
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((micStream: MediaStream) => {
        micStreamRef.current = micStream;
        record(micStream);
      })
      .catch(handleError(MediaDeviceKind.MICROPHONE));
  };

  function handleSuccess(deviceType: MediaDeviceKind) {
    return (stream: MediaStream) => {
      // Set Device Allowed Status
      if (deviceType === MediaDeviceKind.CAMERA) {
        setCameraStatus(DEVICE_STATUS.ALLOWED);
      } else if (deviceType === MediaDeviceKind.MICROPHONE) {
        setMicStatus(DEVICE_STATUS.ALLOWED);
      }

      // For the purpose of this Demo, we don't actually do anything with the stream
      console.log(stream);
    };
  }

  function handleError(deviceType: MediaDeviceKind) {
    return (error: DOMException) => {
      if (deviceType === MediaDeviceKind.CAMERA) {
        setCameraStatus(DEVICE_STATUS.DISALLOWED);
      } else if (deviceType === MediaDeviceKind.MICROPHONE) {
        setMicStatus(DEVICE_STATUS.DISALLOWED);
      }

      // An error occurred getting one or more media based on constraint.
      // See: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      let errMsg =
        'Encountered Error while attempting to getUserMedia ' + deviceType + ' ' + error.message + ' ' + error.name;
      console.error(error.message);
      setError(errMsg);
    };
  }

  const getAvailableDevices = () => {
    // NOTE: Even if access is denied, there may be records depending on browser
    let enumeratorPromise = navigator.mediaDevices.enumerateDevices();
    enumeratorPromise.then((devices: MediaDeviceInfo[]) => {
      setDevices(devices);
    });
  };

  const init = () => {
    // Set Initialized Status
    setInitalized(true);

    // // Attempt to get the audio context
    // try {
    //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
    //   window.audioContext = new AudioContext(); // TODO: Use ref
    // } catch (e) {
    //   setError('AudioContext is not supported');
    //   return;
    // }

    // Finally Update state with all media devices.
    getAvailableDevices();
  };

  let audioPlayer = <audio ref={audioPlayerRef} controls autoPlay playsInline></audio>;

  useEffect(() => {
    // Check permission
    navigator.permissions.query({ name: 'microphone' }).then(function (result: PermissionStatus) {
      let perm: PermissionState = result.state;
      console.log(result);
    });
  });
  let content;
  if (!isInitialized) {
    content = (
      <>
        <br />

        <Button fullWidth onClick={init} color="primary" variant="contained">
          Start
        </Button>
      </>
    );
  } else {
    content = (
      <div>
        {audioPlayer}

        <IconButton aria-label="delete" onClick={recordClickHandler}>
          {!recordingStatus && <RecordIcon fontSize="large" htmlColor="red" />}
          {recordingStatus && <PauseIcon fontSize="large" htmlColor="red" />}
        </IconButton>

        <hr />
        <h3>Raw Device Data</h3>
        <pre>
          {devices.map((device: MediaDeviceInfo) => {
            return JSON.stringify(device.toJSON(), null, ' ');
          })}
        </pre>
      </div>
    );
  }

  // Determine if there is an error
  let errorNode;
  if (error) {
    errorNode = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  return (
    <Container>
      <h2>Record Audio Locally Demo</h2>

      <p>This is an example of detecting available hardware devices in-browser using getUserMedia().</p>

      {errorNode}
      {content}
    </Container>
  );
};

export default DeviceSelectionExample;
