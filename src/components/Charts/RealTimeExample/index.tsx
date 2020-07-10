import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import useChartDimensions from "../../../hooks/useChartDimensions";
import { IRealTimeChartData } from "../../../interfaces";

/*
example react d3: 
1) using multiple useEffect: https://www.youtube.com/watch?v=a9QyTI-2D80
*/

interface IRealTimeProps {
  showLabel?: boolean;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  data: IRealTimeChartData[];
}

const TRANSITION_DURATION = 100;

/**
 * Realtime data visualisation over a time period
 * @TODO option to smooth out animation, by hiding the jerky ness
 * https://observablehq.com/@bartok32/real-time-area-chart
 */
const RealTimeExample: React.FC<IRealTimeProps> = ({
  showLabel = true,
  height = 300,
  fill,
  stroke = "#038C7E",
  strokeWidth = 5,
  data,
}) => {
  const d3Container = React.useRef<SVGSVGElement | null>(null);

  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const [ref, dimensions] = useChartDimensions({
    marginTop: 20,
    marginRight: 20,
    marginBottom: showLabel ? 40 : 20,
    marginLeft: showLabel ? 40 : 20,
  });

  // scales and axis
  let x = d3
    .scaleTime()
    .domain([d3.min(data, (d) => d.date)!, d3.max(data, (d) => d.date)!])
    .range([dimensions.marginLeft, dimensions.width - dimensions.marginRight]);

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)!])
    .nice()
    .range([dimensions.height - dimensions.marginBottom, dimensions.marginTop]);

  let xAxis = (g) =>
    g
      .attr("class", "xAxisGroup")
      .attr(
        "transform",
        `translate(0,${dimensions.height - dimensions.marginBottom})`
      )
      .attr("stroke-width", 0)
      .call(d3.axisBottom(x).ticks(dimensions.width / 80));

  let yAxis = (g) =>
    g
      .attr("class", "yAxisGroup")
      .attr("transform", `translate(${dimensions.marginLeft},0)`)
      .attr("stroke-width", 0)
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d3.format(".0%"))
          .ticks(dimensions.height / 80)
      );

  const line = d3
    .line<IRealTimeChartData>()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  const area = d3
    .area<IRealTimeChartData>()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.date))
    .y0(y(0))
    .y1((d) => y(d.value));

  // initalise the chart
  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(d3Container.current));
    } else {
      // selection.selectAll('rect').data(data).
      selection.append("g").call(xAxis);

      selection.append("g").call(yAxis);

      selection
        .append("path")
        .datum(data)
        .attr("fill", fill || "none")
        .attr("stroke", stroke || "black")
        .attr("stroke-width", strokeWidth || 2)
        .attr("class", "line-chart-line")
        // .attr("fill", "none")
        // .attr("stroke", "steelblue")
        // .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
    }
  }, [selection]);

  // Update the chart
  useEffect(() => {
    if (selection) {
      x = d3
        .scaleTime()
        .domain([d3.min(data, (d) => d.date)!, d3.max(data, (d) => d.date)!])
        .range([
          dimensions.marginLeft,
          dimensions.width - dimensions.marginRight,
        ]);

      y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)!])
        .nice()
        .range([
          dimensions.height - dimensions.marginBottom,
          dimensions.marginTop,
        ]);

      selection
        .select(".xAxisGroup")
        .transition()
        .duration(TRANSITION_DURATION)
        .ease(d3.easeLinear)
        .call(xAxis);

      selection
        .select(".yAxisGroup")
        .transition()
        .duration(TRANSITION_DURATION)
        .ease(d3.easeLinear)
        .call(yAxis);

      // updated line
      selection
        .select(".line-chart-line")
        .datum(data)
        .transition()
        .duration(TRANSITION_DURATION)
        .ease(d3.easeQuadIn)
        .attr("d", line);
    }
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: height,
      }}
      ref={ref}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        ref={d3Container}
      ></svg>
    </div>
  );
};

export default RealTimeExample;
