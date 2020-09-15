import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';

type ColorIndex = [number, number, number, number]; // r,g,b,a

function getColorIndiciesForCoord(x: number, y: number, width: number): ColorIndex {
  let red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

const AsciiImageScreen: React.FC<{}> = () => {
  let canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let imageSrcRef = React.useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const receiveImage = () => {
    // TODO: Add Form Controls
    let pixelSize = 10;
    //let index = getColorIndiciesForCoord(0, 0, imageSrcRef.current?.width);
    //console.log(index);
    let srcImgNode = imageSrcRef.current;
    if (srcImgNode && canvasRef.current && canvasCtxRef.current) {
      canvasRef.current.width = srcImgNode.width;
      canvasRef.current.height = srcImgNode.height;
      canvasCtxRef.current.drawImage(srcImgNode, 0, 0);
      //grayscale();
      pixelize(canvasRef.current, canvasCtxRef.current, srcImgNode, pixelSize);
    }
  };

  let pixelize = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    sourceImage: HTMLImageElement,
    pxSize: number
  ): void => {
    let h = sourceImage.height;
    let w = sourceImage.width;
    let i, j;

    let data = context.getImageData(0, 0, w, h);
    let pxS = pxSize;

    let index: ColorIndex;
    let r: number;
    let g: number;
    let b: number;

    for (i = 0; i < w + pxS; i += pxS) {
      for (j = 0; j < h + pxS; j += pxS) {
        context.beginPath();
        context.rect(i, j, i + pxS, j + pxS);
        index = getColorIndiciesForCoord(i, j, w);
        r = data.data[index[0]];
        g = data.data[index[1]];
        b = data.data[index[2]];
        //a = data.data[index[3]];

        context.fillStyle = `rgba(${r}, ${g}, ${b}, 255)`;
        //context.strokeStyle = '#ffffff';
        //context.stroke();
        context.fill();
      }
    }

    return;
  };

  let grayscale = function () {
    let imageData = canvasCtxRef.current?.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    let data = imageData!.data;

    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    if (imageData) {
      canvasCtxRef.current!.putImageData(imageData, 0, 0);
    }
  };

  return (
    <Container>
      <h2>Canvas</h2>
      <canvas ref={canvasRef}></canvas>

      <img
        ref={imageSrcRef}
        crossOrigin="anonymous"
        src="https://storage.googleapis.com/cdn.mplsart.com/blainestuff/pexels-burst-374134.jpg"
        onLoad={receiveImage}
      />
    </Container>
  );
};

export default AsciiImageScreen;
