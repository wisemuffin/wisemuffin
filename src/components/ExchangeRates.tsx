import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useOktaAuth } from "@okta/okta-react";
import {
  getGamesForPlayer,
  getGamesForPlayer_getGamesForPlayer,
} from "../graphql/generated/getGamesForPlayer";

const PLAYER = gql`
  query getGamesForPlayer {
    getGamesForPlayer(playerID: "3", minScore: 0) {
      ID
      name
      score
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

function ExchangeRates() {
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
  return data.getGamesForPlayer.map(({ name, score }) => (
    <div key={name}>
      <p>
        {name}: {score}
      </p>
      <button onClick={() => deletePlayer()}>delete</button>
      {JSON.stringify(dataDeleted)}
    </div>
  ));
}
export default ExchangeRates;
