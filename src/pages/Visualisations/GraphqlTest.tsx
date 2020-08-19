import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";

import ExchangeRates from "../../components/ExchangeRates";

const GraphqlTest = (props) => {
  return (
    <section style={{ marginTop: "15px" }}>
      <Container maxWidth="lg">
        <Typography variant="h3">Grapqhl Test</Typography>
        <ExchangeRates />
      </Container>
    </section>
  );
};

export default GraphqlTest;
