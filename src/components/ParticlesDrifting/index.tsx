import React from "react";
import Canvas from "../Canvas";
/**
 * canvas example
 * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 */
const ParticlesDrifting = () => {
  // const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // const contextRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
  //   null
  // );
  // const [isDrawing, setIsDrawing] = React.useState(false);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  // React.useEffect(() => {
  //   if (canvasRef.current === undefined || canvasRef.current === null) return;
  //   const canvas = canvasRef.current;
  //   canvas.width = window.innerWidth * 2;
  //   canvas.height = window.innerHeight * 2;
  //   canvas.style.width = `${window.innerWidth}px`;
  //   canvas.style.height = `${window.innerHeight}px`;

  //   const context = canvas.getContext("2d");
  //   let frameCount = 0;
  //   let animationFrameId;
  //   // context!.scale(2, 2);
  //   // context!.lineCap = "round";
  //   // context!.strokeStyle = "black";
  //   // context!.lineWidth = 5;
  //   // contextRef.current = context;

  //   //Our draw came here
  //   const render = () => {
  //     frameCount++;
  //     draw(context, frameCount);
  //     animationFrameId = window.requestAnimationFrame(render);
  //   };
  //   render();

  //   return () => {
  //     window.cancelAnimationFrame(animationFrameId);
  //   };
  // }, [draw]);

  // const startDrawing = ({ nativeEvent }) => {
  //   const { offsetX, offsetY } = nativeEvent;
  //   contextRef.current!.beginPath();
  //   contextRef.current!.moveTo(offsetX, offsetY);
  //   setIsDrawing(true);
  // };

  // const finishDrawing = () => {
  //   contextRef.current!.closePath();
  //   setIsDrawing(false);
  // };

  // const draw = ({ nativeEvent }) => {
  //   if (!isDrawing) {
  //     return;
  //   }
  //   const { offsetX, offsetY } = nativeEvent;
  //   contextRef.current!.lineTo(offsetX, offsetY);
  //   contextRef.current!.stroke();
  // };

  return (
    <div>
      <Canvas
        draw={draw}
        // onMouseDown={startDrawing}
        // onMouseUp={finishDrawing}
        // onMouseMove={draw}
      />
    </div>
  );
};

export default ParticlesDrifting;
