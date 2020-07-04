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
}

const RealTimeExample: React.FC<IRealTimeProps> = ({
  showLabel = true,
  height = 300,
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
    marginTop: 40,
    marginRight: 30,
    marginBottom: showLabel ? 75 : 40,
    marginLeft: showLabel ? 75 : 40,
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
      .call(
        d3
          .axisBottom(x)
          .ticks(dimensions.width / 80)
          .tickSizeOuter(0)
      );

  let yAxis = (g) =>
    g
      .attr("class", "yAxisGroup")
      .attr("transform", `translate(${dimensions.marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("$ Close")
      );

  const line = d3
    .line<IData>()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.date))
    .y((d) => y(d.value));

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
        .attr("class", "line-chart-line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
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

      selection.select(".xAxisGroup").call(xAxis);
      selection.select(".yAxisGroup").call(yAxis);

      // updated line
      selection.select(".line-chart-line").datum(data).attr("d", line);
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
        style={{ border: "3px solid red" }}
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
