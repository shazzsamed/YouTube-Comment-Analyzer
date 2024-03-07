import React, { useState } from "react";
import Navbar from "./navbar.js";
import Insights from "./insights.js";
import Timeline from "./timeline.js";

function Dashboard(props) {
  const [activeComponent, setActiveComponent] = useState("");

  let apiResponseObject;
  try {
    apiResponseObject = JSON.parse(props.apiResponse);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle the error, such as setting a default value for apiResponseObject
    // For example:
    apiResponseObject = {};
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case "Insights":
        return (
          <Insights
            total_comments={apiResponseObject["total_comments"]}
            unique_users={apiResponseObject["unique_users"]}
            last_commented={apiResponseObject["last_commented"]}
          />
        );
      case "Timeline":
        return <Timeline />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="w-5/6 h-5/6 bg-darkgrey rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center">
        {renderComponent()}
      </div>
    </div>
  );
}

export default Dashboard;
