import React, { useState } from "react";
import RealTimeExample from "../RealTimeExample";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Pulse from "../ChartParts/Pulse";

interface IRealTimeContainerProps {
  sensorName: string;
  colorSuccess?: string;
  colorError?: string;
  sensorId?: string;
  xTicks?: number;
}

const darkGreenHex = "#038C7E";
const danger = "#D90D32";

const RealTimeExampleContainer = ({
  sensorId,
  sensorName,
  colorSuccess = "#038C7E",
  colorError = "#D90D32",
  xTicks = 20,
}: IRealTimeContainerProps) => {
  const lastTimestamp = new Date();
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState(false);
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

        <RealTimeExample />

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
