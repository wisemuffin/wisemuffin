import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import CanvasExample from "../../components/Canvas/CanvasExample";
import CanvasExampleSun from "../../components/Canvas/CanvasExampleSun";
import ParticlesDrifting from "../../components/ParticlesDrifting";

const CanvasExamples = (props) => {
  return (
    <section style={{ marginTop: "15px" }}>
      <Container maxWidth="lg">
        <Alert severity="info">
          Dave's playground for using canvas 🚧 Under Construction 🚧
        </Alert>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Canvas Examples
        </Typography>

        <ParticlesDrifting />
        <CanvasExampleSun />
        <CanvasExample />
      </Container>
    </section>
  );
};

export default CanvasExamples;
