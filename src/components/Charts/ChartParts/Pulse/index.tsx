import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

interface IPulseProps {
  connected: boolean;
  error: boolean;
  colorSuccess?: string;
  colorError?: string;
}
const Pulse = ({
  connected,
  error,
  colorSuccess = "#038C7E",
  colorError = "#D90D32",
}: IPulseProps) => {
  const pulseSpring = useSpring({
    from: {
      background: "rgba(2, 140, 126, 1)",
      boxShadow: "0 0 0 0 rgba(2, 140, 126, 0.4)",
    },
    to: async (next) => {
      while (1) {
        await next({
          background: "rgba(2, 140, 126, 1)",
          boxShadow: "0 0 0 0 rgba(2, 140, 126, 0.8",
        });
        await next({
          background: "rgba(2, 140, 126, 0.8)",
          boxShadow: "0 0 0 10px rgba(2, 140, 126, 0.2)",
        });
        await next({
          background: "rgba(2, 140, 126, 0.6)",
          boxShadow: "0 0 0 0 rgba(2, 140, 126, 0)",
        });
      }
    },
    config: config.gentle,
  });
  return (
    <div>
      <span style={{ color: connected ? colorSuccess : colorError }}>
        {error}
        <PulseStyle
          style={connected ? pulseSpring : null}
          // cant pass true to styled compoents: https://github.com/styled-components/styled-components/issues/1198
          connected={connected ? 1 : 0}
        />
        {connected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

export default Pulse;

const darkGreenHex = "#038C7E";
const danger = "#D90D32";

const PulseStyle = styled(animated.div)`
  margin: auto 8px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: ${(props) => (props.connected ? darkGreenHex : danger)};
  box-shadow: 0 0 0 ${(props) => (props.connected ? darkGreenHex : danger)};
`;
