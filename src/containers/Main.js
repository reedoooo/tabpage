import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ProTabs from "../pages/proTabs/ProTabs";

export default class Main extends Component {
  render() {
    return (
      <>
        <ChakraProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={<ProTabs savedTabsData={this.props.savedTabsData} />}
            />
            <Route
              path="/protabs"
              element={<ProTabs savedTabsData={this.props.savedTabsData} />}
            />
          </Routes>
        </ChakraProvider>
      </>
    );
  }
}
