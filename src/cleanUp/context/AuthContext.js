import { createContext, useContext, useState } from "react";
import { Auth0Context, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const domain = "dev-eq6zzpz5vj8o8v17.us.auth0.com";
  const clientId = "pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn";

  const onRedirectCallback = (appState) => {
    console.log("yup its this one");
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId)) {
    return null;
  }

  const value = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/callback",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>
    </Auth0Provider>
  );
};

  