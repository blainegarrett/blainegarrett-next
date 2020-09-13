import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';

type ColorIndex = [number, number, number, number]; // r,g,b,a

// function getColorIndiciesForCoord(x: number, y: number, width: number): ColorIndex {
//   let red = y * (width * 4) + x * 4;
//   return [red, red + 1, red + 2, red + 3];
// }

function AsciiImageScreen() {
  let canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  let canvasCtx = React.useRef<CanvasRenderingContext2D | null>(null);
  let imageSrcRef = React.useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const receiveImage = () => {
    //let index = getColorIndiciesForCoord(0, 0, imageSrcRef.current?.width);
    //console.log(index);

    canvasCtx.current!.drawImage(imageSrcRef.current!, 0, 0);
    grayscale();
  };

  let grayscale = function () {
    let imageData = canvasCtx.current?.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    let data = imageData!.data;

    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    if (imageData) {
      canvasCtx.current!.putImageData(imageData, 0, 0);
    }
  };

  return (
    <Container>
      <h2>Canvas</h2>
      <canvas ref={canvasRef} height="1500" width="1500"></canvas>
      <img
        ref={imageSrcRef}
        crossOrigin="anonymous"
        src="https://storage.googleapis.com/cdn.mplsart.com/blainestuff/about_wedding.jpg"
        onLoad={receiveImage}
      />
    </Container>
  );
}

export default AsciiImageScreen;
