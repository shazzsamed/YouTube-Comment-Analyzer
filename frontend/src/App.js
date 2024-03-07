import React, { useState } from "react";
import Dashboard from "./components/dashboard.js";
import Searchbar from "./components/searchbar.js";

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const handleApiResponse = (data) => {
    setApiResponse(data);
  };
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-4">
        <Searchbar handleApiResponse={handleApiResponse} />
        <Dashboard apiResponse={apiResponse} />
      </div>
    </div>
  );
}

export default App;
