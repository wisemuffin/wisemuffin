import React from "react";
import Canvas from "../../Canvas";
/**
 * canvas example
 * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 *
 * end result: https://codepen.io/franksLaboratory/pen/aborBPJ
 * and https://www.youtube.com/watch?v=d620nV6bp0A
 */
const CanvasExample = () => {
  const draw = (ctx: CanvasRenderingContext2D, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 50, 50);

    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        ctx.fillStyle =
          "rgb(" +
          Math.floor(255 - 42.5 * i) +
          ", " +
          Math.floor(255 - 42.5 * j) +
          ", 0)";
        ctx.fillRect(j * 25, i * 25 + 200, 25, 25);
      }
    }
  };

  return (
    <div>
      <Canvas draw={draw} />
    </div>
  );
};

export default CanvasExample;
