import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const TabsContext = createContext();

// Create Provider
export const TabsProvider = ({ children }) => {
  const [savedTabsData, setSavedTabsData] = useState([]);
  const [savedSettingsData, setSavedSettingsData] = useState([]);

  // Fetch saved tabs from server
  const fetchSavedTabsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/tab`,
      );
      const savedTabs = response.data
        .filter((item) => item)
        .map((item) => ({
          name: item.tab.name,
          size: item.tab.size,
          color: item.tab.color,
          linkUrl: item.tab.linkUrl,
          imgUrl: item.tab.imgUrl,
          id: item._id,
        }));
      setSavedTabsData(savedTabs);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch saved settings from server
  const fetchSavedSettings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/settings`,
      );
      const savedSettings = response.data
        .filter((item) => item)
        .map((item) => ({
          name: item.name,
          color: item.color,
          id: item._id,
        }));
      setSavedSettingsData(savedSettings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedTabsData();
    fetchSavedSettings();
  }, []);

  // Method to handle adding a new tab to the server
  const handleAddTabToServer = async (newLink) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/tab`,
        newLink,
      );
      const savedData = response.data;
      console.log(savedData);
      fetchSavedTabsData();
    } catch (error) {
      console.error(error);
    }
  };

  // Method to save changes in settings to the server
  const saveSettingsChangesToServer = async (newSetting) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/settings`,
        newSetting,
      );
      console.log(response.data);
      const savedSettings = response.data;
      console.log(savedSettings);
      fetchSavedSettings();
    } catch (error) {
      console.error(error);
    }
  };
  const value = {
    savedTabsData,
    savedSettingsData,
    handleAddTabToServer,
    saveSettingsChangesToServer,
  };

  useEffect(() => {
    console.log('TABS CONTEXT:', {
      value,
    });
  }, [value]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
