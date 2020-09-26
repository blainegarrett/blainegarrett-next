import React, { useState } from 'react';
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
import CameraIcon from '@material-ui/icons/VideoCam';
import UnknownDeviceIcon from '@material-ui/icons/DeviceUnknown';

let useStyles = makeStyles((theme: Theme) => {
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

const StatusIndicator: React.FC<{ status: DEVICE_STATUS }> = (props) => {
  return <span>{props.status}</span>;
};

const DeviceSelectionExample: React.FC<{}> = () => {
  let classes = useStyles();

  // Establish State
  // TODO: This could be a reducer, but I wanted to keep it separate for clarity
  let [isInitialized, setInitalized] = useState<boolean>(false);
  let [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [micStatus, setMicStatus] = useState<DEVICE_STATUS>(DEVICE_STATUS.PENDING);
  let [cameraStatus, setCameraStatus] = useState<DEVICE_STATUS>(DEVICE_STATUS.PENDING);

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

    // Get User Media status for Mic
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess(MediaDeviceKind.MICROPHONE))
      .catch(handleError(MediaDeviceKind.MICROPHONE))
      .finally(() => {
        getAvailableDevices();
      });

    // Get User Media status for Camera
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(handleSuccess(MediaDeviceKind.CAMERA))
      .catch(handleError(MediaDeviceKind.CAMERA))
      .finally(() => {
        getAvailableDevices();
      });

    // Finally Update state with all media devices.
    getAvailableDevices();
  };

  let getDeviceRows = (deviceType: MediaDeviceKind, status: DEVICE_STATUS) => {
    return devices
      .filter((device: MediaDeviceInfo) => device.kind === deviceType)
      .map((device: MediaDeviceInfo, i) => {
        let IconClass = UnknownDeviceIcon;
        if (device.kind === MediaDeviceKind.MICROPHONE) {
          IconClass = MicIcon;
        } else if (device.kind === MediaDeviceKind.SPEAKER) {
          IconClass = SpeakerIcon;
        } else if (device.kind === MediaDeviceKind.CAMERA) {
          IconClass = CameraIcon;
        }

        return (
          <TableRow key={i} className={clsx({ [classes.errorRow]: status === DEVICE_STATUS.DISALLOWED })}>
            <TableCell>
              <IconClass />
            </TableCell>
            <TableCell>
              {device.label} {status === DEVICE_STATUS.DISALLOWED && ' Unable to get Device info. Access is blocked.'}
            </TableCell>
            <TableCell style={{ maxWidth: 30, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {device.deviceId}
            </TableCell>
            <TableCell style={{ maxWidth: 30, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {device.groupId}
            </TableCell>
          </TableRow>
        );
      });
  };

  let deviceTable = (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className={classes.headerRow}>
            <TableCell className={classes.headerCell}>Kind</TableCell>
            <TableCell className={classes.headerCell}>Label</TableCell>
            <TableCell className={classes.headerCell}>Device ID</TableCell>
            <TableCell className={classes.headerCell}>Group ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.deviceTypeRow}>
            <TableCell className={classes.deviceTypeCell}>
              <CameraIcon />
            </TableCell>
            <TableCell colSpan={1} className={classes.deviceTypeCell}>
              Camera
            </TableCell>
            <TableCell colSpan={2} className={classes.deviceTypeCell}>
              Access: <StatusIndicator status={cameraStatus} />
            </TableCell>
          </TableRow>
          {getDeviceRows(MediaDeviceKind.CAMERA, cameraStatus)}

          <TableRow className={classes.deviceTypeRow}>
            <TableCell className={classes.deviceTypeCell}>
              <MicIcon />
            </TableCell>
            <TableCell className={classes.deviceTypeCell}>Microphone</TableCell>
            <TableCell colSpan={2} className={classes.deviceTypeCell}>
              Access: <StatusIndicator status={micStatus} />
            </TableCell>
          </TableRow>
          {getDeviceRows(MediaDeviceKind.MICROPHONE, micStatus)}

          <TableRow className={classes.deviceTypeRow}>
            <TableCell className={classes.deviceTypeCell}>
              <SpeakerIcon />
            </TableCell>
            <TableCell className={classes.deviceTypeCell}>Speaker (Chrome Only?)</TableCell>
            <TableCell colSpan={2} className={classes.deviceTypeCell}>
              Access: <StatusIndicator status={micStatus} />
            </TableCell>
          </TableRow>
          {getDeviceRows(MediaDeviceKind.SPEAKER, micStatus)}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
        {deviceTable}
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
      <h2>WebRTC Device Detection</h2>
      <p>This is an example of detecting available devices using WebRTC.</p>

      {errorNode}
      {content}
    </Container>
  );
};

export default DeviceSelectionExample;
