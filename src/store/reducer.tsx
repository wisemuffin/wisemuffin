import { IAction, IState } from "../types/interfaces";

const reducer = (stateContext: IState, { type, payload }: IAction): IState => {
  switch (type) {
    case "SHOW_NAV":
      return {
        ...stateContext,
        showNav: payload,
      };

    case "TOGGLE_DARK_THEME":
      console.log("TOGGLE_DARK_THEME ", payload);
      return {
        ...stateContext,
        dark: !stateContext.dark,
      };

    case "ADD_EPISODE_DATA":
      return {
        ...stateContext,
        episodes: [...payload],
      };

    case "ADD_SHOWS":
      return {
        ...stateContext,
        shows: [...payload],
      };

    case "ADD_FAV":
      return {
        ...stateContext,
        favourites: [...stateContext.favourites, payload],
      };

    case "REMOVE_FAV":
      return {
        ...stateContext,
        favourites: payload,
      };
    case "AUTH":
      return {
        ...stateContext,
        auth: payload,
      };
    case "USER":
      return {
        ...stateContext,
        user: payload,
      };

    default:
      return stateContext;
  }
};

export default reducer;
