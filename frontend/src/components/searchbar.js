import React, { useState } from "react";

function Searchbar({ handleApiResponse }) {
  //cdconst [searchTerm, setSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  const handleAnalyzeClick = (event) => {
    event.preventDefault();
    const videoId = getVideoIdFromUrl(searchTerm);
    console.log(videoId);
    fetch(`http://127.0.0.1:5000/api/home?videoid=${videoId}`) // Assuming the Flask API is running on the same host
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        handleApiResponse(JSON.stringify(data));
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term state as user types
  };
  const getVideoIdFromUrl = (url) => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1] : null;
  };

  return (
    <form class="w-2/5 mx-auto mt-8" onSubmit={handleAnalyzeClick}>
      <div class="relative w-full">
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paste URL"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          class="font-mono text-white absolute end-2.5 bottom-2.5 bg-silver hover:bg-metal focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Analyze
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
