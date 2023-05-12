import React, { Component } from "react";

// import "../assets/styles/reset.css";
// import "../assets/styles/App.scss";
// import PrivateRoute from "./components/utils/PrivateRoute/PrivateRoute";
// import Home from "../pages/home/Home";
// import Projects from "../pages/projects/Projects";
// import Settings from "../pages/settings/Settings";
// import Error404 from "../pages/errors/error404/Error";
// import { settings } from "../portfolio.js";
// import Splash from "../pages/splash/Splash";
// import Login from "../pages/login/Login copy/Login";
// import Profile from "../pages/profile/Profile";
// import ResumeNew from "../pages/resume/Resume";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import CallBack from "../services/auth/CallBack";
import ProTabs from "../pages/proTabs/ProTabs";
// import ProfileData from "../components/data/ProfileData";
// import { Auth0ProviderWithHistory } from "../services/auth/auth0-provider-with-history";

export default class Main extends Component {
  render() {
    // if (settings.isSplash) {
      return (
        <>
          <ChakraProvider>
            <Routes>
            <Route
              path="/"
              exact
              element={
                <ProTabs
                savedTabsData={this.props.savedTabsData} 
                />
              }
            />
              <Route
                path="/protabs"
                element={
                  <ProTabs
                  savedTabsData={this.props.savedTabsData} 
                  />
                }
              />
              {/* <Route path="*" render={(props) => <CallBack {...props} />} /> */}
            </Routes>
          </ChakraProvider>

        </>
      );
  }
}
