import { initialState, IState } from "./Context";

interface IAction {
  type: string;
  payload: any;
}

const reducer = (stateContext: IState, { type, payload }: IAction): IState => {
  switch (type) {
    case "SHOW_NAV":
      return {
        ...stateContext,
        showNav: payload,
      };
    case "DRILL_DOWN_METRIC":
      console.log("payload: ", payload);
      return {
        ...stateContext,
        drillDownMetric: payload,
      };
    case "WEEKLY_REPORT_SELECTED":
      console.log("reducer running for :", payload);
      return {
        ...stateContext,
        weeklyReportSelected: payload,
        drillDownMetric: {},
      };
    case "TOGGLE_DARK_THEME":
      console.log("TOGGLE_DARK_THEME ", payload);
      return {
        ...stateContext,
        dark: !stateContext.dark,
      };

    default:
      return stateContext;
  }
};

export default reducer;
