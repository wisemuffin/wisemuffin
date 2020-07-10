import React, { useState, useEffect } from "react";
import RealTimeExample from "../RealTimeExample";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Pulse from "../ChartParts/Pulse";
import { IRealTimeChartData } from "../../../interfaces";
import * as d3 from "d3";

interface IRealTimeContainerProps {
  sensorName: string;
  colorSuccess?: string;
  colorError?: string;
  sensorId?: string;
  numberOfRecords?: number;
  tickInterval?: number;
}

const darkGreenHex = "#038C7E";
const danger = "#D90D32";

const RealTimeExampleContainer = ({
  sensorId,
  sensorName,
  colorSuccess = "#038C7E",
  colorError = "#D90D32",
  numberOfRecords = 20, // number of records
  tickInterval = 1000, // miliseconds
}: IRealTimeContainerProps) => {
  const lastTimestamp = new Date();
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState(false);

  // inital data
  const generateInitalData = () => {
    let currentValue = 0.5;
    let initalData = d3.range(numberOfRecords).map((d, i) => {
      let rand = (Math.random() - 0.5) * 0.2;
      currentValue =
        currentValue + rand < 0.2 || currentValue + rand > 0.8
          ? currentValue - rand
          : currentValue + rand;

      return {
        date:
          Math.round(Date.now() / tickInterval) * tickInterval -
          (numberOfRecords - d) * tickInterval,
        value: currentValue,
      };
    });
    return initalData;
  };

  const [data, setData] = useState<IRealTimeChartData[]>(generateInitalData());

  // refresh data
  const refreshData = (prevData: any[]) => {
    let updatedData = [...prevData];
    // remove records when reducing time range
    updatedData =
      updatedData.length >= numberOfRecords
        ? updatedData.slice(prevData.length - numberOfRecords, prevData.length)
        : updatedData;

    let lastTime =
        Math.round(prevData[prevData.length - 1].date / tickInterval) *
        tickInterval,
      currentTime = Math.round(Date.now() / tickInterval) * tickInterval,
      howManyTimes =
        Math.round((currentTime - lastTime) / tickInterval) > 1
          ? Math.round((currentTime - lastTime) / tickInterval)
          : 1,
      currentValue = prevData[prevData.length - 1].value;

    for (let i = 0; i < howManyTimes; i++) {
      // keep removing 1 record for each new record added unless records is less than numberOfRecords
      updatedData =
        updatedData.length < numberOfRecords
          ? updatedData
          : updatedData.slice(1, prevData.length);
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

  // Update the data
  useEffect(() => {
    const timer = setTimeout(() => {
      setData((prevData) => refreshData(prevData));
    }, tickInterval);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <Paper>
      <Box p={2}>
        <Typography
          display="inline"
          variant="h3"
          style={{ color: connected ? colorSuccess : colorError }}
        >
          {connected ? `${sensorName}` : "Connecting..."}
        </Typography>
        <div style={{ float: "right" }}>
          <Pulse connected={connected} error={error} />
        </div>

        <RealTimeExample data={data} />

        <Typography
          style={{ color: connected ? colorSuccess : colorError }}
          variant="subtitle1"
        >
          {connected ? "Last reading was at " : ""}
          {lastTimestamp.toLocaleTimeString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default RealTimeExampleContainer;
