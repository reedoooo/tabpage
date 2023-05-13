// Import necessary hooks from React
import { useEffect, useState } from "react";
// Import Main component from containers
import Main from "./containers/Main";

// Define App functional component
function App() {
  // Declare and initialize state variables for saved tabs and notes data and a boolean to check if data has loaded
  const [savedTabsData, setSavedTabsData] = useState({});
  const [savedNotesData, setSavedNotesData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  // useEffect hook to load tab data when the component mounts
  useEffect(() => {
    const loadTabData = async () => {
      try {
        // Define request options for fetch call
        const requestOptions = {
          method: "GET",
        };

        // Make a fetch call to get tab data from the server
        const serverResponse = await fetch(
          `${process.env.REACT_APP_SERVER}/api/myTabRoutes`,
          requestOptions
        );
        // Parse server response to json
        const serverData = await serverResponse.json();
        console.log(serverData);

        // Update state with the fetched data
        const updatedSavedTabsData = serverData;
        setSavedTabsData(updatedSavedTabsData);
        // Indicate that data has been loaded
        setDataLoaded(true);
      } catch (error) {
        // If an error occurs, log it and set dataLoaded to true
        console.error("Error fetching response:", error);
        setDataLoaded(true);
      }
    };

    // Call the function to load the tab data
    loadTabData();
  }, []); // Empty array means this effect runs once on component mount and not on subsequent re-renders

  // useEffect hook to load note data when the component mounts
  useEffect(() => {
    const loadNoteData = async () => {
      try {
        // Define request options for fetch call
        const requestOptions = {
          method: "GET",
        };

        // Make a fetch call to get note data from the server
        const serverResponse = await fetch(
          `${process.env.REACT_APP_SERVER}/api/myTabRoutes`,
          requestOptions
        );
        // Parse server response to json
        const serverData = await serverResponse.json();
        console.log(serverData);

        // Update state with the fetched data
        const updatedSavedTabsData = serverData;
        setSavedNotesData(updatedSavedTabsData);
        // Indicate that data has been loaded
        setDataLoaded(true);
      } catch (error) {
        // If an error occurs, log it and set dataLoaded to true
        console.error("Error fetching response:", error);
        setDataLoaded(true);
      }
    };

    // Call the function to load the note data
    loadNoteData();
  }, []); // Empty array means this effect runs once on component mount and not on subsequent re-renders

  // Render the Main component with the fetched data and dataLoaded state
  return (
    <div>
      <Main savedTabsData={savedTabsData} savedNotesData={savedNotesData} dataLoaded={dataLoaded} />
    </div>
  );
}

// Export the App component as the default export
export default App;
