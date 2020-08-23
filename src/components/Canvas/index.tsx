import React from "react";
import useCanvas from "../../hooks/useCanvas";
import useChartDimensions from "../../hooks/useChartDimensions";
import { ICanvasOptions } from "../../types/interfaces";

interface ICanvasProps {
  draw: any;
  options: ICanvasOptions;
}
const Canvas = ({
  draw,
  options = { context: "2d", height: 400 },
  ...rest
}) => {
  const { context, height, ...moreConfig } = options;
  const canvasRef = useCanvas(draw, { context });

  const [ref, dimensions] = useChartDimensions({
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
  });

  return (
    <div
      style={{
        width: "100%",
        height: height,
      }}
      ref={ref}
    >
      <canvas
        width={dimensions.width}
        height={dimensions.height}
        ref={canvasRef}
        {...rest}
      />
    </div>
  );
};

export default Canvas;
