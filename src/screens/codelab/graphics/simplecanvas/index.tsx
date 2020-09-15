import React, { useRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';

const SimpleCanvasExample: React.FC<{}> = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;
      ctx!.beginPath();
      ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx!.stroke();
    }
  }, []);

  return (
    <Container>
      <canvas ref={canvasRef}></canvas>

      <p>
        See{' '}
        <a
          href="https://hashnode.blainegarrett.com/html-5-canvas-react-useref-and-typescript-ckf4jju8r00eypos1gyisenyf"
          target="_blank"
          rel="noreferrer"
        >
          This Hashnode Article
        </a>{' '}
        for the logic behind this example.
      </p>
    </Container>
  );
};

export default SimpleCanvasExample;
