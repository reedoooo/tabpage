import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "../pages/home/Home";

export default class Main extends Component {
  render() {
    return (
      <>
        <ChakraProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={<Home savedTabsData={this.props.savedTabsData} savedNotesData={this.props.savedNotesData} />}
            />
            <Route
              path="/home"
              element={<Home savedTabsData={this.props.savedTabsData} savedNotesData={this.props.savedNotesData} />}
            />
          </Routes>
        </ChakraProvider>
      </> 
    );
  }
}
