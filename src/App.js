import { useEffect, useState } from "react";
import Main from "./containers/Main";

function App() {
  const [savedTabsData, setSavedTabsData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadTabData = async () => {
      try {
        const requestOptions = {
          method: "GET",
        };

        const serverResponse = await fetch(`${process.env.REACT_APP_SERVER}/api/myTabRoutes`, requestOptions); // Update the URL to process.env.REACT_APP_SERVER
        const serverData = await serverResponse.json();
        console.log(serverData);

        setSavedTabsData(serverData);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching response:", error);
        setDataLoaded(true);
      }
    };

    loadTabData();
  }, []);

  return (
    <div>
      <Main savedTabsData={savedTabsData} dataLoaded={dataLoaded} />
    </div>
  );
}

export default App;