import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import useChartDimensions from "../../../hooks/useChartDimensions";

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
}

const TRANSITION_DURATION = 100;

const RealTimeExample: React.FC<IRealTimeProps> = ({
  showLabel = true,
  height = 300,
  fill,
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

  const [data, setData] = useState<IData[]>(generateInitalData());

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
    .line<IData>()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  const area = d3
    .area<IData>()
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

  // Update the data
  useEffect(() => {
    const timer = setTimeout(() => {
      setData((prevData) => refreshData(prevData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

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

interface IData {
  date: number;
  value: number;
}

// inital data
const n = 20; // number of records
const tickInterval = 500;
const generateInitalData = () => {
  let currentValue = 0.5;
  let initalData = d3.range(n).map((d, i) => {
    let rand = (Math.random() - 0.5) * 0.2;
    currentValue =
      currentValue + rand < 0.2 || currentValue + rand > 0.8
        ? currentValue - rand
        : currentValue + rand;

    return {
      date:
        Math.round(Date.now() / tickInterval) * tickInterval -
        (n - d) * tickInterval,
      value: currentValue,
    };
  });
  return initalData;
};

// refresh data
const refreshData = (prevData: any[]) => {
  let updatedData = [...prevData];
  let lastTime = Math.round(prevData[n - 1].date / tickInterval) * tickInterval,
    currentTime = Math.round(Date.now() / tickInterval) * tickInterval,
    howManyTimes =
      Math.round((currentTime - lastTime) / tickInterval) > 1
        ? Math.round((currentTime - lastTime) / tickInterval)
        : 1,
    currentValue = prevData[n - 1].value;

  for (let i = 0; i < howManyTimes; i++) {
    updatedData = updatedData.slice(1, n);
    let rand = (Math.random() - 0.5) * 0.2;
    currentValue =
      currentValue + rand >= 0.2
        ? currentValue + rand > 0.8
          ? currentValue - rand
          : currentValue + rand
        : currentValue - rand;

    updatedData.push({
      date: currentTime - (howManyTimes - i - 1) * tickInterval,
      value: currentValue,
    });
  }
  return updatedData;
};
