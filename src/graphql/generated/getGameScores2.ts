/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGameScores2
// ====================================================

export interface getGameScores2_getGameScores {
  __typename: "Player";
  ID: string | null;
  name: string | null;
  score: number | null;
  game: string | null;
  playerID: string | null;
}

export interface getGameScores2 {
  getGameScores: getGameScores2_getGameScores[] | null;
}
