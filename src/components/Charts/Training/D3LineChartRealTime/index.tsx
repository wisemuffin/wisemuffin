import React, { useEffect, useState } from "react";
import * as d3 from "d3";

/*
example react d3: 
1) using multiple useEffect: https://www.youtube.com/watch?v=a9QyTI-2D80
*/

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

const D3LineChartRealTime: React.FC = () => {
  const d3Container = React.useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);
  const [data, setData] = useState<IData[]>(generateInitalData());

  const width = 900,
    height = 500,
    margin = { top: 20, right: 12, bottom: 30, left: 30 };

  // scales and axis
  let x = d3
    .scaleTime()
    .domain([d3.min(data, (d) => d.date)!, d3.max(data, (d) => d.date)!])
    .range([margin.left, width - margin.right]);

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)!])
    .nice()
    .range([height - margin.bottom, margin.top]);

  let xAxis = (g) =>
    g
      .attr("class", "xAxisGroup")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

  let yAxis = (g) =>
    g
      .attr("class", "yAxisGroup")
      .attr("transform", `translate(${margin.left},0)`)
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setData((prevData) => refreshData(prevData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    if (selection) {
      x = d3
        .scaleTime()
        .domain([d3.min(data, (d) => d.date)!, d3.max(data, (d) => d.date)!])
        .range([margin.left, width - margin.right]);

      y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)!])
        .nice()
        .range([height - margin.bottom, margin.top]);

      selection.select(".xAxisGroup").call(xAxis);
      selection.select(".yAxisGroup").call(yAxis);

      // updated line

      selection.select(".line-chart-line").datum(data).attr("d", line);
    }
  }, [data]);

  return (
    <div
      style={{
        padding: "10px",
        width: width,
        height: height,
      }}
    >
      <svg
        // viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        ref={d3Container}
        style={{ border: "3px solid red" }}
      ></svg>
    </div>
  );
};

export default D3LineChartRealTime;
