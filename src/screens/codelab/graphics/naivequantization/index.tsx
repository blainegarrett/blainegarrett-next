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
    //let pixelSize = 10;
    //let index = getColorIndiciesForCoord(0, 0, imageSrcRef.current?.width);
    let srcImgNode = imageSrcRef.current;
    if (srcImgNode && canvasRef.current && canvasCtxRef.current) {
      canvasRef.current.width = srcImgNode.width;
      canvasRef.current.height = srcImgNode.height;
      canvasCtxRef.current.drawImage(srcImgNode, 0, 0);
      let palette: RGB[] = [
        // [1, 1, 1],
        // [25, 25, 25],
        // [100, 100, 100],

        [96, 25, 37], // Claret Wine
        [169, 131, 130], // Vintage Blush
        [108, 95, 87], // London Gray
        [177, 173, 170], // Stone Gray
        [161, 174, 167], //Granite
        [254, 249, 229], // Navajo White
        [33, 33, 33], //Dark Walnut
      ];
      quantize(canvasRef.current, canvasCtxRef.current, srcImgNode, palette);
      //grayscale();
      //pixelize(canvasRef.current, canvasCtxRef.current, srcImgNode, pixelSize);
    }
  };

  const distance = (p1: number[], p2: number[]): number => {
    const maxDimension = p1.length > p2.length ? p1.length : p2.length;

    let i = 0;
    let sum = 0.0;
    let n1 = 0.0;
    let n2 = 0.0;

    while (i < maxDimension) {
      n1 = p1[i] || 0;
      n2 = p2[i] || 0;
      sum = sum + Math.pow(n2 - n1, 2);
      i++;
    }

    return Math.sqrt(sum);
  };

  type RGB = [number, number, number];
  const closestColor = (color: RGB, palette: RGB[]): RGB => {
    let minRGB: RGB = palette[0];
    let minDistance = Infinity;

    let i = 0;
    let paletteSize = palette.length;
    let iDistance = 0;
    for (i = 0; i < paletteSize; i++) {
      iDistance = distance(color, palette[i]);
      if (iDistance < minDistance) {
        minDistance = iDistance;
        minRGB = palette[i];
      }
    }
    return minRGB;
  };

  let quantize = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    sourceImage: HTMLImageElement,
    palette: RGB[]
  ): void => {
    let h = sourceImage.height;
    let w = sourceImage.width;
    let i;

    let pixels = context.getImageData(0, 0, w, h);
    let data = pixels.data;
    let r: number;
    let g: number;
    let b: number;
    let replacementColor: RGB = palette[0];

    for (i = 0; i < data.length; i += 4) {
      r = data[i];
      g = data[i + 1];
      b = data[i + 2];

      replacementColor = closestColor([r, g, b], palette);
      data[i] = replacementColor[0];
      data[i + 1] = replacementColor[1];
      data[i + 2] = replacementColor[2];
    }
    canvasCtxRef.current?.putImageData(pixels, 0, 0); //drawImage(data, 0, 0);
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
      <h2>Naive Color Quantization</h2>
      <p>
        This example demonstrates applying a limited color palette to an image. In this case, I am applying a palette
        made up of the Rustoleum Spray paint colors Claret Wine, Vintage Blush, London Gray, Stone Gray, Granite, Navajo
        White, Dark Walnut.{' '}
        <a
          href="https://hashnode.blainegarrett.com/euclidean-distance-in-n-dimensions-and-naive-image-quantization-ckf8ohadm00okq5s1d2dr5mj2"
          target="_blank"
          rel="noreferrer"
        >
          Read My Post on Hashnode
        </a>{' '}
        for the motivation behind this example.
      </p>
      <h3>Processed Image</h3>
      <canvas ref={canvasRef}></canvas>

      <h3>Source Image</h3>
      <img
        ref={imageSrcRef}
        crossOrigin="anonymous"
        src="https://storage.googleapis.com/cdn.mplsart.com/blainestuff/pexels-alison.jpg"
        onLoad={receiveImage}
      />
    </Container>
  );
};

export default AsciiImageScreen;
