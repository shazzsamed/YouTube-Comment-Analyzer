import React from "react";
import "./styles.css";

function Insights(props) {
  const { total_comments, unique_users, last_commented } = props;
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">
        Youtube Comment Feed Analyzer
      </h1>
      <div className="font-mono text-center text-white text-3xl mb-12">
        one spot for analyzing your YouTube comments
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-72 rounded-xl h-64 bg-silver shadow-5xl">
          <div className="font-mono text-center text-white text-3xl">
            Total
            <br />
            Comments
          </div>
          <div className="font-mono font-extrabold text-center text-white text-5xl mt-10">
            {total_comments}
          </div>
        </div>
        <div className="w-full md:w-72 rounded-xl h-64 bg-silver shadow-5xl">
          <div className="font-mono text-center text-white text-3xl">
            Total
            <br />
            Users Engaged
          </div>
          <div className="font-mono font-extrabold text-center text-white text-5xl mt-10">
            {unique_users}
          </div>
        </div>
        <div className="w-full md:w-72 rounded-xl h-64 bg-silver shadow-5xl">
          <div className="font-mono text-center text-white text-3xl">
            Last
            <br />
            Commented On
          </div>
          <div className="font-mono font-extrabold text-center text-white text-3xl mt-10">
            {last_commented}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;
