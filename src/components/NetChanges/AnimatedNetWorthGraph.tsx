import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type AnimatedNetWorthGraphProps = Readonly<{
  animationProgress: number;
  data: ReadonlyArray<NetWorthAtDate>;
}>;

export type NetWorthAtDate = {
  date: Date;
  netWorth: number;
};

export function AnimatedNetWorthGraph({
  animationProgress,
  data,
}: AnimatedNetWorthGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [localProgress, setLocalProgress] = useState(0);

  const minNetWorth = useMemo(
    () => Math.min(...data.map((dataPoint) => dataPoint.netWorth)),
    [data]
  );

  const maxNetWorth = useMemo(
    () => Math.max(...data.map((dataPoint) => dataPoint.netWorth)),
    [data]
  );

  const scaleY = useCallback(
    (netWorth: number, canvasHeight: number) =>
      ((maxNetWorth - netWorth) / (maxNetWorth - minNetWorth)) * canvasHeight,
    [minNetWorth, maxNetWorth]
  );

  const drawLine = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      data: ReadonlyArray<{
        date: Date;
        netWorth: number;
      }>,
      progress: number
    ) => {
      // Clear previous drawing
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#007bff'; // Line color
      ctx.lineJoin = 'round';

      const drawUpToIndex = Math.floor(progress * data.length);

      data.slice(0, drawUpToIndex).forEach(
        (
          dataPoint: {
            date: Date;
            netWorth: number;
          },
          index: number
        ) => {
          const x = (ctx.canvas.width / data.length) * index;
          const y = scaleY(dataPoint.netWorth, ctx.canvas.height);
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      );

      ctx.stroke();
    },
    [scaleY]
  );

  const animate = useCallback(() => {
    // Update local progress towards the target animationProgress
    setLocalProgress((prevProgress) => {
      const progressStep = 0.01; // Adjust this value for speed of animation
      return prevProgress + progressStep > animationProgress
        ? animationProgress
        : prevProgress + progressStep;
    });

    // Continue the animation loop
    requestRef.current = requestAnimationFrame(animate);
  }, [animationProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Start the animation
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  // Draw the line based on the local progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    drawLine(context, data, localProgress);
  }, [localProgress, data, drawLine]);

  return <canvas ref={canvasRef} width={500} height={300} />;
}
