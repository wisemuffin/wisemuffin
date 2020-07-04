import React from "react";
import RealTimeExample from "../RealTimeExample";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const RealTimeExampleContainer = () => {
  return (
    <Paper>
      <Typography variant="h3">Real Time Example</Typography>
      <RealTimeExample />
    </Paper>
  );
};

export default RealTimeExampleContainer;
