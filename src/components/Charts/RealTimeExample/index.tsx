import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";

/*
example = https://observablehq.com/@bartok32/real-time-area-chart
*/
const RealTimeExample = ({ dimensions = {}, dataset = [1, 2, 3] }) => {
  const ref = useRef(null);

  // varliables
  const height = 125,
    margin = 25,
    tickInterval = 1000,
    timeWindow = 240000,
    animation = 1,
    n = 240,
    fill = "#6D83F2";

  /***
   * draw the chart by giving d3 control of the DOM O_O
   */
  // useEffect(() => {
  //   d3DoyoawThang();
  //   return () => d3.select(ref.current).select(".removableBounds").remove();
  // }, [dimensions, dataset]);

  // const d3DoyoawThang = () => {
  //   // set bounds
  //   const bounds = d3
  //     .select(ref.current)
  //     .select(".bounds")
  //     .append("g")
  //     .attr("class", "removableBounds");
  //   // Draw periferals
  //   const startingLabelsGroup = bounds
  //     .append("g")
  //     .style("transform", "translateX(-20px)");

  //   // Scales & axes
  //   const x = d3
  //     .scaleTime()
  //     .domain(d3.extent(data.map((d) => d.date)))
  //     .range([margin * 2, width + margin]);

  //   const xAxis = (g) =>
  //     g
  //       .attr("transform", `translate(0, ${y.range()[0]})`)
  //       .call(d3.axisBottom(x).tickSizeOuter(0));

  //   const y = d3
  //     .scaleLinear()
  //     .domain([0, 1])
  //     .range([height - margin, margin * 0.5]);

  //   const color = d3.scaleSequential(d3.interpolate("white", "#6D83F2"));

  //   const yAxis = (g) =>
  //     g
  //       .attr("transform", `translate(${x.range()[0]})`)
  //       .call(d3.axisLeft(y).ticks(3).tickSizeOuter(margin))
  //       .call((g) => g.style("fill", "white"))
  //       .call((g) => g.select(".domain").style("stroke", "white"))
  //       .call((g) => g.selectAll(".tick > text").attr("dx", -margin * 0.2))
  //       .call((g) =>
  //         g
  //           .selectAll(".tick > line")
  //           .attr("x1", -margin * 0.2)
  //           .attr("x2", -margin * 0.4)
  //       );

  //   // functions
  //   const animateSelect = (select) => {
  //     d3.select(select)
  //       .style("font-size", "0px")
  //       .interrupt()
  //       .transition()
  //       .ease(d3.easePoly)
  //       .duration(200)
  //       .style("width", "20px")
  //       .transition()
  //       .ease(d3.easeBounce)
  //       .duration(300)
  //       .style("font-size", "12px")
  //       .style("width", "100px");
  //   };

  //   const t = function (g, action) {
  //     g.interrupt()
  //       .transition()
  //       .ease(d3.easeLinear)
  //       .duration(tickInterval)
  //       .call(action);
  //   };

  //   const area = d3
  //     .area()
  //     .curve(d3.curveLinear)
  //     .x((d) => x(d.date))
  //     .y0(y(0))
  //     .y1((d) => y(d.value));
  // };

  return <svg ref={ref}></svg>;
};

export default RealTimeExample;
