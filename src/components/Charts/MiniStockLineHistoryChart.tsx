import React, { useEffect, useRef, useContext } from "react";
import Chart from "chart.js";

import Store from "../../store/Store";

import moment from "moment";
import { number } from "prop-types";
/*
https://www.chartjs.org/docs/latest/configuration/layout.html
*/

const timeFormat = "MMM Do YY";

// TODO centralise logic at run time

const MiniStockLineChart = (props) => {
  const {
    stockCode,
    chartTitle,
    ticksDivideBy,
    fromDate,
    toDate,
    frequency,
  } = props;
  const ref = "testchart";
  const chartRef = React.useRef<HTMLCanvasElement>(null);
  const { state } = useContext(Store);
  const { yahooFinanceApiOffChartWithinCard } = state;

  const drawChart = (data) => {
    const ctx: any = chartRef.current?.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((label) => moment.unix(label.x).format("DD MMM YY")),
        datasets: [
          {
            label: chartTitle,

            data: data.map((point) => {
              return {
                x: moment(point.x).toDate(),
                y: point.y,
              };
            }),
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],

            /* // scriptable options e.g. green or red!
            backgroundColor: function(context) {
              var index = context.dataIndex;
              var value = context.dataset.data[index];
              return value < 0 ? 'red' :  // draw negative values in red
                  index % 2 ? 'blue' :    // else, alternate values in blue and green
                  'green';
          },
          */
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        // responsive: false,

        animation: {
          duration: 4000,
        },
        title: {
          display: false,
          // text: 'Custom Chart Title'
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              // gridLines: false,
              gridLines: { display: false },
              display: false,
              ticks: {
                // beginAtZero: true
              },
            },
          ],
          xAxes: [
            {
              gridLines: { display: false },
              display: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % ticksDivideBy !== 0 ? "" : tick;
                },
              },
            },
          ],
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
        tooltips: {
          mode: "nearest",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              var labelPre: Chart.ChartDataSets = data.datasets![
                tooltipItem.datasetIndex!
              ];

              var label = labelPre.label!;

              if (typeof tooltipItem.yLabel === "number") {
                label! += ": $";
                label! += Math.round(tooltipItem.yLabel * 100) / 100;
              }
              return label;
            },
          },
        },
      },
    });
  };
  const getYahooFinance = async () => {
    try {
      const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=${frequency}&filter=history&period1=${fromDate}&period2=${toDate}&symbol=${stockCode}`;
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_YAHOOFINANCE!,
        },
      });
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const getDataAndDraw = async () => {
      const preData = yahooFinanceApiOffChartWithinCard
        ? fakeData
        : await getYahooFinance();
      console.log("pre data: ", preData);
      const clonedPreData = {
        ...preData,
        prices: [...preData?.prices],
        timeZone: { ...preData?.timeZone },
        eventsData: [...preData?.eventsData],
      };
      clonedPreData.prices.reverse();
      const data = clonedPreData.prices.map((price) => ({
        x: price.date,
        y: price.close,
      }));
      drawChart(data);
      console.log("chart date: ", JSON.stringify(data));
    };
    getDataAndDraw();
  }, []);
  return (
    <div
      className="chart-container"
      // style={{ position: "relative", height: "40vh", width: "100vw" }}
    >
      <canvas ref={chartRef}>{/* width="400" height="400"> */}</canvas>
    </div>
  );
};

export default MiniStockLineChart;

const fakeData = {
  prices: [
    {
      date: 1562074200,
      open: 1919.3800048828125,
      high: 1934.7900390625,
      low: 1906.6300048828125,
      close: 1934.31005859375,
      volume: 2645900,
      adjclose: 1934.31005859375,
    },
    {
      date: 1561987800,
      open: 1922.97998046875,
      high: 1929.8199462890625,
      low: 1914.6600341796875,
      close: 1922.18994140625,
      volume: 3203300,
      adjclose: 1922.18994140625,
    },
    {
      date: 1561728600,
      open: 1909.0999755859375,
      high: 1912.93994140625,
      low: 1884,
      close: 1893.6300048828125,
      volume: 3037400,
      adjclose: 1893.6300048828125,
    },
    {
      date: 1561642200,
      open: 1902,
      high: 1911.239990234375,
      low: 1898.0400390625,
      close: 1904.280029296875,
      volume: 2141700,
      adjclose: 1904.280029296875,
    },
    {
      date: 1561555800,
      open: 1892.47998046875,
      high: 1903.800048828125,
      low: 1887.3199462890625,
      close: 1897.8299560546875,
      volume: 2441900,
      adjclose: 1897.8299560546875,
    },
    {
      date: 1561469400,
      open: 1911.8399658203125,
      high: 1916.3900146484375,
      low: 1872.4200439453125,
      close: 1878.27001953125,
      volume: 3012300,
      adjclose: 1878.27001953125,
    },
    {
      date: 1561383000,
      open: 1912.6600341796875,
      high: 1916.8599853515625,
      low: 1901.300048828125,
      close: 1913.9000244140625,
      volume: 2283000,
      adjclose: 1913.9000244140625,
    },
  ],
  isPending: false,
  firstTradeDate: 863683200,
  id: "1d15464484001562086800",
  timeZone: { gmtOffset: -18000 },
  eventsData: [],
};
