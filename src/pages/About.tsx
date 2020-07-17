import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grow from "@material-ui/core/Grow";

import Chip from "@material-ui/core/Chip";

interface ChipData {
  key: number;
  label: string;
}

interface ChipDataByType {
  skillType: string;
  skillList: ChipData[];
}

export const About = () => {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState<ChipDataByType[]>([
    {
      skillType: "Font end",
      skillList: [
        { key: 0, label: "Javascript" },
        { key: 1, label: "Typesript" },
        { key: 2, label: "React" },
      ],
    },
    {
      skillType: "Data Vis",
      skillList: [
        { key: 0, label: "D3" },
        { key: 1, label: "Tableau" },
      ],
    },
    {
      skillType: "Data Engineering",
      skillList: [
        { key: 0, label: "Alteryx" },
        { key: 1, label: "Python" },
        { key: 1, label: "SQL" },
        { key: 1, label: "Data Warehousing" },
        { key: 1, label: "Data Modeling" },
      ],
    },
    {
      skillType: "AWS Cloud",
      skillList: [
        { key: 0, label: "Developer" },
        { key: 1, label: "Solutions Architect" },
        { key: 1, label: "Big data Specilist" },
      ],
    },
    {
      skillType: "Finance",
      skillList: [{ key: 0, label: "Chartered Management Accountant" }],
    },
  ]);

  return (
    <section style={{ marginTop: "15px" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={12} lg={6}>
            <Grow in>
              <Paper className={classes.aboutMeContainer}>
                <Box p={3}>
                  <Avatar
                    alt="David Griffiths"
                    src="https://res.cloudinary.com/dkn8xtjbm/image/upload/v1594449186/me.jpg"
                    className={classes.large}
                  />
                  <div className={classes.sideBox}>
                    <Typography variant="h4" gutterBottom>
                      David Griffiths
                    </Typography>
                    <Chip
                      label="Sydney AUS"
                      icon={<LocationOnIcon />}
                      variant="outlined"
                    />
                    <Grid container spacing={2}>
                      <Grid item>
                        <IconButton href="https://www.linkedin.com/in/david-griffiths-5a9387a1/">
                          <LinkedInIcon color="primary" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton href="https://github.com/wisemuffin">
                          <GitHubIcon color="primary" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>

                  <Box>
                    <Typography variant="caption">
                      I am a data engineering and visualisation nerd. I love to
                      get people curious about data, ask questions no one has
                      thought to ask, and have the ability to self serve with
                      interactive visualisations. This website is just a
                      portfolio and playground for for me to develope my skills
                      🚀
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grow>
          </Grid>
          <Grid item md={12} lg={6}>
            <Grow in>
              <Paper>
                <Box p={3}>
                  <Typography variant="h5" gutterBottom>
                    Skills
                  </Typography>
                  {chipData.map((chipList) => {
                    return (
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Typography variant="caption">
                            {chipList.skillType}
                          </Typography>
                        </Grid>
                        {chipList.skillList.map((data) => (
                          <Grid item key={data.key}>
                            <Chip label={data.label} />
                          </Grid>
                        ))}
                      </Grid>
                    );
                  })}
                </Box>
              </Paper>
            </Grow>
          </Grid>
          <Grid item md={12} lg={6}>
            <Grow in>
              <Paper>
                <Box p={3}>
                  <Typography variant="h5">Work</Typography>
                  🚧 under construction 🚧
                </Box>
              </Paper>
            </Grow>
          </Grid>
          <Grid item md={12} lg={6}>
            <Grow in>
              <Paper>
                <Box p={3}>
                  <Typography variant="h5">Education</Typography>
                  🚧 under construction 🚧
                </Box>
              </Paper>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      display: "inline-block",
    },
    sideBox: {
      display: "inline-block",
      margin: "20px",
    },
    aboutMeContainer: {},
  })
);

export default About;
