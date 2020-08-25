/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGameScores
// ====================================================

export interface getGameScores_getGameScores {
  __typename: "Player";
  ID: string | null;
  name: string | null;
  score: number | null;
  game: string | null;
  playerID: string | null;
}

export interface getGameScores {
  getGameScores: getGameScores_getGameScores[] | null;
}
