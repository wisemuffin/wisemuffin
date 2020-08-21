import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";

const UserInfo = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<null | { name: string }>(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  return (
    <div>
      {userInfo && (
        <div>
          <p>Welcome back, {userInfo.name}!</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
