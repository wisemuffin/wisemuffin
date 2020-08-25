/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: player
// ====================================================

export interface player_createPlayerScore {
  __typename: "Player";
  ID: string | null;
  name: string | null;
  score: number | null;
  game: string | null;
  playerID: string | null;
}

export interface player {
  createPlayerScore: player_createPlayerScore;
}

export interface playerVariables {
  ID: string;
  name: string;
  score: number;
  game: string;
  playerID: string;
}
