import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useChartDimensions from "../../../hooks/useChartDimensions";
import { ILineAreaChartData } from "../../../types/interfaces";

interface IProps {
  stockCode: string;
  chartTitle: string;
  ticksDivideBy: number;
  showLabel?: boolean;
  height?: number;
  data: ILineAreaChartData[];
  xAccessor?: <T>(any) => T;
  yAccessor?: <T>(any) => T;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}

const TRANSITION_DURATION = 100;

const LineAreaChart: React.FC<IProps> = ({
  stockCode,
  chartTitle,
  ticksDivideBy,
  showLabel = true,
  height = 300,
  data,
  xAccessor = (d) => d.x,
  yAccessor = (d) => d.y,
  fill = "#038C7E",
  stroke = "#038C7E",
  strokeWidth = 5,
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
    .domain([d3.min(data, xAccessor), d3.max(data, xAccessor)])
    .range([dimensions.marginLeft, dimensions.width - dimensions.marginRight]);

  let y = d3
    .scaleLinear()
    .domain([d3.min(data, yAccessor), d3.max(data, yAccessor)])
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
          .tickFormat(d3.format(""))
          .ticks(dimensions.height / 80)
      );

  const line = d3
    .line<ILineAreaChartData>()
    .defined(yAccessor)
    .x((d) => x(xAccessor(d)))
    .y((d) => y(yAccessor(d)));

  const area = d3
    .area<ILineAreaChartData>()
    .defined(yAccessor)
    .x((d) => x(xAccessor(d)))
    .y0(y(0))
    .y1((d) => y(yAccessor(d)));

  // initalise the chart
  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(d3Container.current));
    } else {
      // selection.selectAll('rect').data(data).
      selection.append("g").call(xAxis);
      console.log("xAxis: ", xAxis);

      selection.append("g").call(yAxis);

      selection
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", stroke || "black")
        .attr("stroke-width", strokeWidth || 2)
        .attr("class", "line-chart-line")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

      //   selection
      //     .append("path")
      //     .datum(data)
      //     .attr("fill", fill)
      //     .attr("opacity", 0.4)
      //     .attr("class", "line-chart-area")
      //     .attr("stroke-width", 1.5)
      //     .attr("stroke-linejoin", "round")
      //     .attr("stroke-linecap", "round")
      //     .attr("d", area);

      // add tool tip
    }
  }, [selection]);

  // Update the chart
  useEffect(() => {
    if (selection) {
      x = d3
        .scaleTime()
        .domain([d3.min(data, xAccessor), d3.max(data, xAccessor)])
        .range([
          dimensions.marginLeft,
          dimensions.width - dimensions.marginRight,
        ]);

      y = d3
        .scaleLinear()
        .domain([d3.min(data, yAccessor), d3.max(data, yAccessor)])
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

      // updated area
      //   selection
      //     .select(".line-chart-area")
      //     .datum(data)
      //     .transition()
      //     .duration(TRANSITION_DURATION)
      //     .ease(d3.easeQuadIn)
      //     .attr("d", area);
    }
  }, [data, dimensions]);

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

export default LineAreaChart;
