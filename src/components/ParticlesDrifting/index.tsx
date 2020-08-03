import React from "react";
import Canvas from "../Canvas";
import * as R from "ramda";
/**
 * canvas example
 * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 *
 * end result: https://codepen.io/franksLaboratory/pen/aborBPJ
 * and https://www.youtube.com/watch?v=d620nV6bp0A
 */
const ParticlesDrifting = () => {
  const draw = (ctx: CanvasRenderingContext2D, frameCount) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const height = 500;
    const width = 1300;
    const min = 0;
    const max = 100;
    const max2 = Math.pow(max, 2);
    const n = 100;
    const particles = new Array(n);
    let speed = 0.0001;
    for (let i = 0; i < n; ++i) {
      particles[i] = {
        x: Math.random() * (width + max * 2) - max,
        y: Math.random() * (height + max * 2) - max,
        vx: 0,
        vy: 0,
      };
    }
    for (let i = 0; i < n; ++i) {
      const p = particles[i];
      p.x += p.vx;
      if (p.x < -max) p.x += width + max;
      else if (p.x > width + max) p.x -= width + max;
      p.y += p.vy;
      if (p.y < -max) p.y += height + max;
      else if (p.y > height + max) p.y -= height + max;
      p.vx += speed * (Math.random() - 0.5) - 0.01 * p.vx;
      p.vy += speed * (Math.random() - 0.5) - 0.01 * p.vy;
    }

    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
        const pi = particles[i];
        const pj = particles[j];
        const dist = Math.pow(pi.x - pj.x, 2) + Math.pow(pi.y - pj.y, 2);
        if (dist < max2) {
          ctx.beginPath();

          ctx.strokeStyle = `hsl(0,0%,${100 - ((max2 - dist) / max2) * 25}%)`;
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.stroke();
        }
      }
    }
  };

  return (
    <div>
      <Canvas draw={draw} />
    </div>
  );
};

export default ParticlesDrifting;
