import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import Context from "../../../../store/Store";
import Button from "@material-ui/core/Button";

const Login = () => {
  const { authState, authService } = useOktaAuth();
  const signIn = () => authService.login("/");
  const signOut = () => authService.logout("/");
  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    dispatch({ payload: authState, type: "AUTH" });
    if (!authState.isAuthenticated) {
      authService.getUser().then((user) => {
        console.log("user", user);
        dispatch({ payload: user, type: "USER" });
      });
    }
  }, [authState]);

  if (authState.isPending) {
    return <Button color="primary">Loading authentication...</Button>;
  } else if (!authState.isAuthenticated) {
    return (
      <Button color="primary" onClick={signIn}>
        Admin: Sign In
      </Button>
    );
  }

  return (
    <Button color="primary" onClick={signOut}>
      Sign Out
    </Button>
  );
};
export default Login;
