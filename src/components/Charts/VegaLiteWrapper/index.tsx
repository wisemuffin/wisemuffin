import React from "react";
import { VegaLite } from "react-vega";
import { VegaLiteProps } from "react-vega/lib/VegaLite";
import { VisualizationSpec } from "vega-embed";
// import { Config as VlConfig, TopLevelSpec as VlSpec } from "vega-lite";
// import { Spec as VgSpec } from "vega";
import { useTheme } from "@material-ui/core/styles";
import * as R from "ramda";

const VegaLiteWrapper = (props: VegaLiteProps) => {
  const theme = useTheme();

  const ff = theme.typography.fontFamily;
  const font = ff?.split(",")[0];

  const config = {
    axis: {
      labelColor: theme.palette.text.primary,
      titleColor: theme.palette.text.primary,
      domain: false,
    },
    legend: {
      labelColor: theme.palette.text.primary,
      titleColor: theme.palette.text.primary,
    },

    background: "",
    font: font,
  };

  const spec_responsive: VisualizationSpec =
    R.intersection(["vconcat", "conact"])(R.keys(props.spec)).length > 0
      ? {
          config: config,
          ...props.spec,
        }
      : {
          // data: { name: "table" },
          // width: "container",
          config: config,
          ...props.spec,
        };

  return (
    // <div>
    //   {R.intersection(["vconcat", "conact"])(R.keys(props.spec)).length > 0 && (
    //     <div>
    //       <div> vconcat</div>
    //       <div>{JSON.stringify(R.keys(props.spec))}</div>
    //       <div>
    //         {JSON.stringify(
    //           R.intersection(["vconcat", "conact"])(R.keys(props.spec))
    //         )}
    //       </div>
    //     </div>
    //   )}

    <VegaLite
      {...props}
      spec={spec_responsive}
      renderer="svg"
      actions={false}
    />
    // </div>
  );
};

export default VegaLiteWrapper;
