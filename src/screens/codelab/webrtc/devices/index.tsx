import React, { useEffect, useState } from 'react';
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

enum PermissionState {
  DENIED = 'denied',
  GRANTED = 'granted',
  PROMPT = 'prompt',
}

// MediaDeviceKind is a defined type, but define enum for clarity
enum MediaDeviceKind {
  CAMERA = 'videoinput',
  MICROPHONE = 'audioinput',
  SPEAKER = 'audiooutput',
}

const StatusIndicator: React.FC<{ status: PermissionState }> = (props) => {
  return <span>{props.status}</span>;
};

const DeviceSelectionExample: React.FC<{}> = () => {
  let classes = useStyles();

  // Establish State
  // TODO: This could be a reducer, but I wanted to keep it separate for clarity
  let [isInitialized, setInitalized] = useState<boolean>(false);
  let [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [micStatus, setMicStatus] = useState<PermissionState>(PermissionState.PROMPT);
  let [cameraStatus, setCameraStatus] = useState<PermissionState>(PermissionState.PROMPT);

  function handleSuccess(deviceType: MediaDeviceKind) {
    return (stream: MediaStream) => {
      // Set Device Allowed Status
      if (deviceType === MediaDeviceKind.CAMERA) {
        setCameraStatus(PermissionState.GRANTED);
      } else if (deviceType === MediaDeviceKind.MICROPHONE) {
        setMicStatus(PermissionState.GRANTED);
      }

      // For the purpose of this Demo, we don't actually do anything with the stream and want to release the device
      // Note: This will cause the camera to momentarily blink
      console.log(stream);
      stream.getTracks().forEach(function (track) {
        track.stop(); // eg. stop camera, mic, etc
      });
    };
  }

  function handleError(deviceType: MediaDeviceKind) {
    return (error: DOMException) => {
      if (deviceType === MediaDeviceKind.CAMERA) {
        setCameraStatus(PermissionState.DENIED);
      } else if (deviceType === MediaDeviceKind.MICROPHONE) {
        setMicStatus(PermissionState.DENIED);
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

  useEffect(() => {
    // Handle Changes to permission state
    let micPermStatus: PermissionStatus;
    let camPermStatus: PermissionStatus;

    if (!(navigator.permissions && navigator.permissions.query)) {
      // Safari 14.0 doesn't support the permissions api
      console.error('navigator.permissions.query is not supported. Unable to listen for changes');
      return;
    }

    const micPermPromise = navigator.permissions.query({ name: 'microphone' });
    const camPermPromise = navigator.permissions.query({ name: 'camera' });

    const micPermListener = (e: Event) => {
      console.log('Microphone Permission Changed');
      let newState: PermissionStatus = e.currentTarget as PermissionStatus;
      if (newState) {
        setMicStatus(newState.state as PermissionState);
      }
    };

    const camPermListener = (e: Event) => {
      console.log('Camera Permission Changed');
      let newState: PermissionStatus = e.currentTarget as PermissionStatus;
      if (newState) {
        setCameraStatus(newState.state as PermissionState);
      }
    };

    micPermPromise
      .then((result: PermissionStatus) => {
        micPermStatus = result;
        setMicStatus(result.state as PermissionState);
        result.addEventListener('change', micPermListener);
      })
      .catch((error) => {
        // FF for example, doesn't allow 'microphone' in the query
        console.error(error);
      });

    camPermPromise
      .then((result: PermissionStatus) => {
        camPermStatus = result;
        setCameraStatus(result.state as PermissionState);
        result.addEventListener('change', camPermListener);
      })
      .catch((error) => {
        // FF for example, doesn't allow 'camera' in the query
        console.error(error);
      });

    // Cleanup logic
    return () => {
      // Disconnect listeners to not pollute listeners on other pages
      micPermStatus && micPermStatus.removeEventListener('change', micPermListener);
      camPermStatus && camPermStatus.removeEventListener('change', camPermListener);
    };
  }, []);

  let getDeviceRows = (deviceType: MediaDeviceKind, status: PermissionState) => {
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
          <TableRow key={i} className={clsx({ [classes.errorRow]: status === PermissionState.DENIED })}>
            <TableCell>
              <IconClass />
            </TableCell>
            <TableCell>
              {device.label} {status === PermissionState.DENIED && ' Unable to get Device info. Access is denied.'}
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
      <p>
        This is an example of detecting available hardware devices in-browser using getUserMedia().
        <a
          href="https://hashnode.blainegarrett.com/accessing-available-devices-in-browser-via-getusermedia-ckfk1bwx800d96cs1fhtcdwee"
          target="blank"
          rel="norrefer"
        >
          See the complementary Hashnode article for more information.
        </a>
      </p>

      {errorNode}
      {content}
      <p>
        Disclaimer: When granting access to your devices, this codelab does not do anything with the audio or video
        stream other than logging out the successful connection. No audio or video data is transferred to your device or
        any off device locations. You may see your camera light blink for a split second while using this demo.
      </p>
    </Container>
  );
};

export default DeviceSelectionExample;
