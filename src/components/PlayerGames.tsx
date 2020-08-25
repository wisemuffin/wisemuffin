import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useOktaAuth } from "@okta/okta-react";
import { getGameScores_getGameScores } from "../graphql/generated/getGameScores";
import EnhancedTable from "./Tables/ReatTableComponents/EnhancedTable";

const PLAYER = gql`
  query getGameScores {
    getGameScores(game: "uno") {
      ID
      name
      score
      game
      playerID
    }
  }
`;

const DELETE_PLAYER = gql`
  mutation deletePlayer {
    deletePlayerScore(ID: "3") {
      name
    }
  }
`;

function PlayerGames() {
  const { authState, authService } = useOktaAuth();

  const { loading, error, data } = useQuery(PLAYER, {
    // variables: {},
  });

  const [deletePlayer, { data: dataDeleted }] = useMutation(DELETE_PLAYER);

  if (loading || !data)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.getGameScores.map(({ name, score }) => (
        <div key={name}>
          <p>
            {name}: {score}
          </p>
          <button onClick={() => deletePlayer()}>delete</button>
          {JSON.stringify(dataDeleted)}
        </div>
      ))}
      <EnhancedTable
        setData={() => {}}
        updateMyData={() => {}}
        skipPageReset={true}
        data={data.getGameScores}
        columns={[
          {
            Header: "ID",
            accessor: "ID",
          },
          {
            Header: "Player Name",
            accessor: "name",
          },
          {
            Header: "Score",
            accessor: "score",
          },
          {
            Header: "Game",
            accessor: "game",
          },
          // {
          //   Header: "Time",
          //   accessor: "properties.time",
          //   Cell: (row) => moment(row.value).format("Do MMM YYYY, h a"),
          // },
          // {
          //   Header: "Magnitude",
          //   accessor: "properties.mag",
          //   Filter: SliderColumnFilter,
          //   aggregate: "average",
          //   Aggregated: ({ value }) => `${value} (avg)`,
          //   Cell: (row) => (
          //     <div
          //       style={{
          //         width: "100%",
          //         height: "100%",
          //         backgroundColor: "#dadada",
          //         borderRadius: "2px",
          //       }}
          //     >
          //       <div
          //         style={{
          //           width: `${row.value * 10}%`, // mag out of 10
          //           height: "100%",
          //           backgroundColor:
          //             row.value < 4.5
          //               ? "#85cc00"
          //               : row.value < 6.5
          //               ? "#ffbf00"
          //               : "#ff2e00",
          //           borderRadius: "2px",
          //           transition: "all .2s ease-out",
          //         }}
          //       >
          //         {row.value}
          //       </div>
          //     </div>
          //   ),
          // },
          // // {
          // //   Header: "Mag Type",
          // //   accessor: "properties.magType",
          // // },
        ]}
      />
    </div>
  );
}
export default PlayerGames;
