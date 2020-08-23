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

import PlayerGames from "../../components/PlayerGames";
import PlayerGames2 from "../../components/PlayerGames2";
import ExampleTable from "../../components/Tables/ReactTable/ExampleTable";

const GraphqlTest = (props) => {
  return (
    <section style={{ marginTop: "15px" }}>
      <Container maxWidth="lg">
        <Typography variant="h3">Grapqhl Test</Typography>
        <PlayerGames2 />

        <PlayerGames />
        <ExampleTable />
      </Container>
    </section>
  );
};

export default GraphqlTest;
