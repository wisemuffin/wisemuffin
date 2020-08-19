import React from "react";
import { useQuery, gql } from "@apollo/client";
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

function ExchangeRates() {
  // const { loading, error, data } = useQuery<getGamesForPlayer>(PLAYER, {
  const { loading, error, data } = useQuery(PLAYER, {
    variables: {},
  });

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("data: ", data);
  return data.getGamesForPlayer.map(({ name, score }) => (
    <div key={name}>
      <p>
        {name}: {score}
      </p>
    </div>
  ));
}
export default ExchangeRates;
