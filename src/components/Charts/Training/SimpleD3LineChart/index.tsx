import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import moment from "moment";

/*

example react d3: 
1) using multiple useEffect: https://www.youtube.com/watch?v=a9QyTI-2D80

not so good) https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102
*/

interface IData {
  date: Date;
  value: number;
}

const SimpleD3LineChart: React.FC = () => {
  const d3Container = React.useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);
  const [data, setData] = useState<IData[]>(initalData);

  const width = 900,
    height = 500,
    margin = { top: 20, right: 12, bottom: 30, left: 30 };

  // scales and axis
  const x = d3
    .scaleTime()
    .domain([d3.min(data, (d) => d.date)!, d3.max(data, (d) => d.date)!])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)!])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  const yAxis = (g) =>
    g
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
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
    }
  }, [selection]);

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

const dataRaw = [
  { date: "2007-04-23T00:00:00.000Z", value: 93.24 },
  { date: "2007-04-24T00:00:00.000Z", value: 95.35 },
  { date: "2007-04-25T00:00:00.000Z", value: 98.84 },
  { date: "2007-04-26T00:00:00.000Z", value: 99.92 },
  { date: "2007-04-29T00:00:00.000Z", value: 99.8 },
  { date: "2007-05-01T00:00:00.000Z", value: 99.47 },
  { date: "2007-05-02T00:00:00.000Z", value: 100.39 },
  { date: "2007-05-03T00:00:00.000Z", value: 100.4 },
  { date: "2007-05-04T00:00:00.000Z", value: 100.81 },
  { date: "2007-05-07T00:00:00.000Z", value: 103.92 },
  { date: "2007-05-08T00:00:00.000Z", value: 105.06 },
  { date: "2007-05-09T00:00:00.000Z", value: 106.88 },
  { date: "2007-05-09T00:00:00.000Z", value: 107.34 },
  { date: "2007-05-10T00:00:00.000Z", value: 108.74 },
  { date: "2007-05-13T00:00:00.000Z", value: 109.36 },
  { date: "2007-05-14T00:00:00.000Z", value: 107.52 },
  { date: "2007-05-15T00:00:00.000Z", value: 107.34 },
  { date: "2007-05-16T00:00:00.000Z", value: 109.44 },
  { date: "2007-05-17T00:00:00.000Z", value: 110.02 },
  { date: "2007-05-20T00:00:00.000Z", value: 111.98 },
  { date: "2007-05-21T00:00:00.000Z", value: 113.54 },
  { date: "2007-05-22T00:00:00.000Z", value: 112.89 },
  { date: "2007-05-23T00:00:00.000Z", value: 110.69 },
  { date: "2007-05-24T00:00:00.000Z", value: 113.62 },
  { date: "2007-05-28T00:00:00.000Z", value: 114.35 },
  { date: "2007-05-29T00:00:00.000Z", value: 118.77 },
  { date: "2007-05-30T00:00:00.000Z", value: 121.19 },
  { date: "2007-06-01T00:00:00.000Z", value: 118.4 },
  { date: "2007-06-04T00:00:00.000Z", value: 121.33 },
  { date: "2007-06-05T00:00:00.000Z", value: 122.67 },
  { date: "2007-06-06T00:00:00.000Z", value: 123.64 },
  { date: "2007-06-07T00:00:00.000Z", value: 124.07 },
  { date: "2007-06-08T00:00:00.000Z", value: 124.49 },
  { date: "2007-06-10T00:00:00.000Z", value: 120.19 },
  { date: "2007-06-11T00:00:00.000Z", value: 120.38 },
  { date: "2007-06-12T00:00:00.000Z", value: 117.5 },
  { date: "2007-06-13T00:00:00.000Z", value: 118.75 },
  { date: "2007-06-14T00:00:00.000Z", value: 120.5 },
  { date: "2007-06-17T00:00:00.000Z", value: 125.09 },
  { date: "2007-06-18T00:00:00.000Z", value: 123.66 },
  { date: "2007-06-19T00:00:00.000Z", value: 121.55 },
  { date: "2007-06-20T00:00:00.000Z", value: 123.9 },
  { date: "2007-06-21T00:00:00.000Z", value: 123 },
  { date: "2007-06-24T00:00:00.000Z", value: 122.34 },
  { date: "2007-06-25T00:00:00.000Z", value: 119.65 },
  { date: "2007-06-26T00:00:00.000Z", value: 121.89 },
  { date: "2007-06-27T00:00:00.000Z", value: 120.56 },
  { date: "2007-06-28T00:00:00.000Z", value: 122.04 },
  { date: "2007-07-02T00:00:00.000Z", value: 121.26 },
  { date: "2007-07-03T00:00:00.000Z", value: 127.17 },
  { date: "2007-07-05T00:00:00.000Z", value: 132.75 },
  { date: "2007-07-06T00:00:00.000Z", value: 132.3 },
  { date: "2007-07-09T00:00:00.000Z", value: 130.33 },
  { date: "2007-07-09T00:00:00.000Z", value: 132.35 },
  { date: "2007-07-10T00:00:00.000Z", value: 132.39 },
  { date: "2007-07-11T00:00:00.000Z", value: 134.07 },
  { date: "2007-07-12T00:00:00.000Z", value: 137.73 },
  { date: "2007-07-15T00:00:00.000Z", value: 138.1 },
  { date: "2007-07-16T00:00:00.000Z", value: 138.91 },
  { date: "2007-07-17T00:00:00.000Z", value: 138.12 },
  { date: "2007-07-18T00:00:00.000Z", value: 140 },
  { date: "2007-07-19T00:00:00.000Z", value: 143.75 },
  { date: "2007-07-22T00:00:00.000Z", value: 143.7 },
  { date: "2007-07-23T00:00:00.000Z", value: 134.89 },
  { date: "2007-07-24T00:00:00.000Z", value: 137.26 },
  { date: "2007-07-25T00:00:00.000Z", value: 146 },
  { date: "2007-07-26T00:00:00.000Z", value: 143.85 },
  { date: "2007-07-29T00:00:00.000Z", value: 141.43 },
  { date: "2007-07-30T00:00:00.000Z", value: 131.76 },
  { date: "2007-08-01T00:00:00.000Z", value: 135 },
  { date: "2007-08-02T00:00:00.000Z", value: 136.49 },
  { date: "2007-08-03T00:00:00.000Z", value: 131.85 },
  { date: "2007-08-06T00:00:00.000Z", value: 135.25 },
  { date: "2007-08-07T00:00:00.000Z", value: 135.03 },
  { date: "2007-08-08T00:00:00.000Z", value: 134.01 },
  { date: "2007-08-09T00:00:00.000Z", value: 126.39 },
  { date: "2007-08-09T00:00:00.000Z", value: 125 },
  { date: "2007-08-12T00:00:00.000Z", value: 127.79 },
  { date: "2007-08-13T00:00:00.000Z", value: 124.03 },
  { date: "2007-08-14T00:00:00.000Z", value: 119.9 },
  { date: "2007-08-15T00:00:00.000Z", value: 117.05 },
  { date: "2007-08-16T00:00:00.000Z", value: 122.06 },
  { date: "2007-08-19T00:00:00.000Z", value: 122.22 },
  { date: "2007-08-20T00:00:00.000Z", value: 127.57 },
  { date: "2007-08-21T00:00:00.000Z", value: 132.51 },
  { date: "2007-08-22T00:00:00.000Z", value: 131.07 },
  { date: "2007-08-23T00:00:00.000Z", value: 135.3 },
  { date: "2007-08-26T00:00:00.000Z", value: 132.25 },
  { date: "2007-08-27T00:00:00.000Z", value: 126.82 },
  { date: "2007-08-28T00:00:00.000Z", value: 134.08 },
  { date: "2007-08-29T00:00:00.000Z", value: 136.25 },
  { date: "2007-08-30T00:00:00.000Z", value: 138.48 },
  { date: "2007-09-04T00:00:00.000Z", value: 144.16 },
  { date: "2007-09-05T00:00:00.000Z", value: 136.76 },
  { date: "2007-09-06T00:00:00.000Z", value: 135.01 },
  { date: "2007-09-07T00:00:00.000Z", value: 131.77 },
  { date: "2007-09-09T00:00:00.000Z", value: 136.71 },
  { date: "2007-09-10T00:00:00.000Z", value: 135.49 },
  { date: "2007-09-11T00:00:00.000Z", value: 136.85 },
  { date: "2007-09-12T00:00:00.000Z", value: 137.2 },
];

const initalData = dataRaw.map((d) => {
  return { date: moment(d.date).toDate(), value: d.value };
});

export default SimpleD3LineChart;
