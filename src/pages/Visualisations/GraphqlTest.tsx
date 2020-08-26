import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import PlayerGames2 from "../../components/Tables/GraphqlTest";
import ExampleTable from "../../components/Tables/ReactTable/ExampleTable";

const GraphqlTest = (props) => {
  return (
    <section style={{ marginTop: "15px" }}>
      <Container maxWidth="lg">
        <Typography variant="h3">Lord of the Rings</Typography>
        <PlayerGames2 />
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="Architecture" subheader="Graphql on Lambda" />
              <CardMedia
                style={{
                  height: "20vh",
                  width: "auto",
                  maxWidth: "490px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                title="Architecture"
                image="https://res.cloudinary.com/dkn8xtjbm/image/upload/c_scale,w_436/v1598438569/wisemuffin/wisemuffin_api.png"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Challenges: Lambda is stateless, so subscriptions that require
                  websockets to be maintained, need to be maintained elsewhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* <ExampleTable /> */}
      </Container>
    </section>
  );
};

export default GraphqlTest;
